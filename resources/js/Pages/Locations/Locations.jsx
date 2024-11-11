import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AppLayout from '@/Layouts/AppLayout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';
import Title from '@/Layouts/Title';


export default function Lokasi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locations, setLocations] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [formData, setFormData] = useState({
    coordinates: '',
    totalDistance: '',
    detailedAddress: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/sites');
      const data = await response.json();
      const processedLocations = data
        .filter(site => site.site_name.includes("ODP"))
        .map(site => {
          const coordinates = site.site_location_maps.split(',');
          return {
            site_name: site.site_name,
            site_address: site.site_address,
            lat: parseFloat(coordinates[0]),
            lon: parseFloat(coordinates[1]),
          };
        });
      setLocations(processedLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

// Variabel untuk menyimpan marker dan polygon aktif
let activeMarker = null;
let activePolygon = null;

const calculateDistanceAndUpdateMap = async (lat, lon, displayName) => {
  const selectedCoords = [lat, lon];

  // Set view peta ke lokasi yang baru
  map.setView(selectedCoords, 13);

  // Periksa apakah marker sudah ada
  if (activeMarker) {
    // Jika marker sudah ada, cukup perbarui lokasinya
    activeMarker.setLatLng(selectedCoords);
    activeMarker.setPopupContent(displayName).openPopup();
  } else {
    // Jika marker belum ada, buat yang baru
    activeMarker = L.marker(selectedCoords, { draggable: true })
      .addTo(map)
      .bindPopup(displayName)
      .openPopup();

    // Tambahkan event listener untuk dragend pada marker
    activeMarker.on("dragend", async (event) => {
      const newLatLng = event.target.getLatLng();
      const updatedLat = newLatLng.lat;
      const updatedLon = newLatLng.lng;

      // Reverse geocode untuk mendapatkan nama lokasi terbaru
      const updatedDisplayName = await getAddressFromCoordinates(updatedLat, updatedLon);

      // Panggil fungsi ini lagi dengan lokasi terbaru
      await calculateDistanceAndUpdateMap(updatedLat, updatedLon, updatedDisplayName || 'Lokasi Tidak Dikenali');
    });
  }

  // Periksa apakah polygon sudah ada
  if (activePolygon) {
    // Jika polygon sudah ada, perbarui posisinya
    activePolygon.setLatLng(selectedCoords);
  } else {
    // Jika polygon belum ada, buat polygon baru
    const radius = 300;
    activePolygon = L.circle(selectedCoords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: radius,
    }).addTo(map);
  }

  // Logika untuk menghitung jarak ke lokasi terdekat
  let nearestDistance = Infinity;
  let nearestLocation = null;

  locations.forEach((location) => {
    if (location.lat && location.lon) {
      const providerLatLng = L.latLng(location.lat, location.lon);
      const selectedLatLng = L.latLng(lat, lon);
      const distanceToProvider = providerLatLng.distanceTo(selectedLatLng);

      if (distanceToProvider < nearestDistance) {
        nearestDistance = distanceToProvider;
        nearestLocation = location;
      }
    }
  });

  // Perbarui formData dan nearestLocation berdasarkan lokasi baru
  setFormData({
    coordinates: `${lat}, ${lon}`,
    totalDistance: nearestDistance.toFixed(2),
    detailedAddress: displayName,
  });
  setNearestLocation(nearestLocation);

  // Set isDisabled berdasarkan jarak
  const isOutOfReach = nearestDistance > 300; // Radius 300m
  setIsDisabled(isOutOfReach);

  // Tampilkan notifikasi toast berdasarkan jangkauan lokasi
  const toastMessage = isOutOfReach
    ? `Jarak ke lokasi terdekat: ${nearestDistance.toFixed(2)} meter (Terlalu Jauh!)`
    : `Jarak ke lokasi terdekat: ${nearestDistance.toFixed(2)} meter (Terjangkau!)`;

  const toastStyle = isOutOfReach
    ? { background: 'linear-gradient(45deg, #ff416c, #ff4b2b)' }
    : { background: 'linear-gradient(45deg, #56ab2f, #a8e063)' };

  toast[isOutOfReach ? 'error' : 'success'](toastMessage, {
    style: {
      ...toastStyle,
      color: '#fff',
      padding: window.innerWidth < 640 ? '8px 10px' : '15px',
      fontSize: window.innerWidth < 640 ? '12px' : '16px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      maxWidth: window.innerWidth < 640 ? '90%' : 'auto',
      margin: '0 auto',
    },
  });

  // Pastikan hanya ada satu event listener pada map
  map.off("click");  // Hapus event listener click lama
  map.on("click", async (e) => {
    const clickedLat = e.latlng.lat;
    const clickedLon = e.latlng.lng;

    // Reverse geocode untuk mendapatkan nama lokasi yang diklik
    const clickedDisplayName = await getAddressFromCoordinates(clickedLat, clickedLon);

    // Panggil fungsi ini lagi dengan lokasi yang diklik
    await calculateDistanceAndUpdateMap(clickedLat, clickedLon, clickedDisplayName || 'Lokasi Tidak Dikenali');
  });
};


  
  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  };

  const handleSelectLocation = async (lat, lon, displayName) => {
    if (!lat || !lon) {
      toast.error('Koordinat tidak valid');
      return;
    }
    await calculateDistanceAndUpdateMap(lat, lon, displayName);
    setSearchResults([]);
  };

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          if (isNaN(latitude) || isNaN(longitude)) {
            toast.error('Koordinat lokasi saat ini tidak valid.');
            return;
          }

          const address = await getAddressFromCoordinates(latitude, longitude);
          await calculateDistanceAndUpdateMap(latitude, longitude, address || 'Lokasi Saat Ini');
        },
        (error) => {
          toast.error('Gagal mendapatkan lokasi: ' + error.message, {
            style: {
              background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
              color: '#fff',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
            },
          });
        }
      );
    } else {
      toast.error('Geolokasi tidak didukung oleh browser Anda.');
    }
  };

  useEffect(() => {
    if (!map) {
      const initialMap = L.map('map').setView([-7.5801076, 110.765559], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(initialMap);
      setMap(initialMap);
      fetchLocations();
    }
  }, [map]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.totalDistance <= 300 && formData.coordinates) {
      Inertia.visit('/packages', {
        state: { from: '/locations' },
      });
    } else {
      toast.error('Lokasi tidak valid atau jarak terlalu jauh, Anda tidak bisa melanjutkan ke paket layanan.', {
        style: {
          background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
          color: '#fff',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
        },
      });
    }
  };

  const openGoogleMaps = () => {
    try {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}`;
      window.open(googleMapsUrl, '_blank');
    } catch (error) {
      console.error('Failed to open Google Maps:', error);
      alert('Could not open Google Maps. Please check if it’s blocked by an extension.');
    }
  };

  return (
    <AuthenticatedLayout>
      <AppLayout>
        <Title/>
          <div className="min-h-screen bg-gray-100 text-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto py-8 md:py-12 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-gray-800 relative">
              <span className="relative z-10">Cek Apakah Lokasi Anda Termasuk Dalam Jangkauan Kami</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-lg"></span>
            </h1>

            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-700 hover:text-gray-900">
              Masukkan Alamat Pemasangan Anda (Disarankan menggunakan Titik Koordinat Atau URL Lokasi Anda)
            </p>
              <div className="relative mb-4 md:mb-6 max-w-sm md:max-w-lg mx-auto">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Cari alamat..."
                  className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white hover:shadow-lg transition duration-200"
                />
                {searchResults.length > 0 && (
                  <ul className="bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto absolute z-20 w-full mt-1">
                    {searchResults.map((result) => (
                      <li
                        key={result.place_id}
                        className="flex items-center p-3 hover:bg-blue-100 cursor-pointer transition duration-200"
                        onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
                      >
                        <FaMapMarkerAlt className="text-blue-500 mr-3" />
                        <span className="font-semibold text-gray-800">{result.display_name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-center my-4">
                <button
                  onClick={handleUseCurrentLocation}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 transform"
                >
                  Gunakan Lokasi Saya
                </button>
              </div>

              <div id="map" className="w-full h-64 sm:h-80 md:h-96 rounded-lg shadow-lg mb-4 sm:mb-6 z-10 relative"></div>

              {nearestLocation && (
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600 mr-2" />
                    Detail Lokasi:
                  </h3>
                  <p className="text-sm sm:text-base mb-1">
                    <strong>Alamat:</strong> {formData.detailedAddress || nearestLocation.site_address}
                  </p>
                  <p className="text-sm sm:text-base mb-1">
                    <strong>Koordinat:</strong> {formData.coordinates}
                  </p>
                  <p className="text-sm sm:text-base mb-1">
                    <strong>Total Jarak:</strong> {formData.totalDistance} meter
                  </p>
                  <p className="flex items-center justify-center mb-2 text-sm sm:text-base">
                    <strong>Keterangan:</strong>
                    {isDisabled ? (
                      <span className="text-red-600 ml-2 flex items-center">
                        <FaTimesCircle className="mr-1" />
                        Alamat tidak dapat dijangkau.
                      </span>
                    ) : (
                      <span className="text-green-600 ml-2 flex items-center">
                        <FaCheckCircle className="mr-1" />
                        Alamat dapat dijangkau.
                      </span>
                    )}
                  </p>
                  {isDisabled && (
                    <p className="mt-2 text-sm sm:text-base">
                      Silakan hubungi kami untuk informasi lebih lanjut.
                      <a href="/contact" className="ml-2 text-blue-500 underline font-semibold">Hubungi Kami</a>
                    </p>
                  )}
                </div>            
              )}
              <form onSubmit={handleSubmit} className="flex justify-center">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`w-full max-w-xs py-3 rounded-lg font-bold text-white ${
                    isDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  } flex items-center justify-center transition-transform transform duration-200`}
                >
                  {isDisabled ? (
                    <>
                      <FaExclamationTriangle className="mr-2" />
                      Lokasi Tidak Valid
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Lanjutkan ke Paket Layanan
                    </>
                  )}
                </button>
              </form>
            </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            transition={Slide}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </AppLayout>
    </AuthenticatedLayout>
  );
}
