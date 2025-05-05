import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppLayout from "@/Layouts/AppLayout";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import Title from "@/Layouts/Title";

export default function Lokasi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState([]);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [formData, setFormData] = useState({
    coordinates: "",
    totalDistance: "",
    detailedAddress: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isWithinRange, setIsWithinRange] = useState(false);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/sites");
      const data = await response.json();
      const processedLocations = data
        .filter((site) => site.site_name.includes("ODP"))
        .map((site) => {
          const coordinates = site.site_location_maps.split(",");
          return {
            site_name: site.site_name,
            site_address: site.site_address,
            lat: parseFloat(coordinates[0]),
            lon: parseFloat(coordinates[1]),
          };
        });
      setLocations(processedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
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

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  const clearExistingLayers = () => {
    if (!map) return;
    
    map.eachLayer((layer) => {
      if (
        layer instanceof L.Marker || 
        layer instanceof L.Circle || 
        layer instanceof L.Polygon ||
        layer instanceof L.Polyline
      ) {
        map.removeLayer(layer);
      }
    });
  };

  const updateMapLocation = async (lat, lon, displayName) => {
    const selectedCoords = [lat, lon];
    clearExistingLayers();

    // Tambahkan marker untuk lokasi yang dipilih
    const newMarker = L.marker(selectedCoords, { draggable: true })
      .addTo(map)
      .bindPopup(`<b>Lokasi Anda</b><br>${displayName}`)
      .openPopup();

    newMarker.on("dragend", async (event) => {
      const newLatLng = event.target.getLatLng();
      const updatedLat = newLatLng.lat;
      const updatedLon = newLatLng.lng;
      const updatedDisplayName = await getAddressFromCoordinates(updatedLat, updatedLon);
      await updateMapLocation(
        updatedLat,
        updatedLon,
        updatedDisplayName || "Lokasi Tidak Dikenali"
      );
    });

    // Tambahkan lingkaran radius 500 meter
    const rangeCircle = L.circle(selectedCoords, {
      color: "#3182ce",
      fillColor: "#3182ce",
      fillOpacity: 0.2,
      radius: 500, // 500 meter
    }).addTo(map);

    rangeCircle.bindPopup("Jangkauan 500 meter dari lokasi Anda");

    let nearestDistance = Infinity;
    let nearestLoc = null;

    // Tambahkan marker untuk semua ODP
    locations.forEach((location) => {
      const locationLatLng = L.latLng(location.lat, location.lon);
      const marker = L.marker([location.lat, location.lon])
        .addTo(map)
        .bindPopup(`<b>${location.site_name}</b><br>${location.site_address}`);
      
      // Tambahkan garis penghubung ke ODP terdekat
      const distance = locationLatLng.distanceTo(L.latLng(lat, lon));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLoc = location;
      }
    });

    // Jika ada ODP terdekat, tambahkan garis penghubung dan hitung jarak
    if (nearestLoc) {
      const nearestLatLng = L.latLng(nearestLoc.lat, nearestLoc.lon);
      const selectedLatLng = L.latLng(lat, lon);
      
      // Garis penghubung ke ODP terdekat
      const connectionLine = L.polyline([selectedLatLng, nearestLatLng], {
        color: "#e53e3e",
        weight: 2,
        dashArray: "5, 5",
      }).addTo(map);
      
      connectionLine.bindPopup(`Jarak ke ODP terdekat: ${nearestDistance.toFixed(2)} meter`);

      // Cek apakah dalam jangkauan 500 meter
      const withinRange = nearestDistance <= 500;
      setIsWithinRange(withinRange);
      
      if (withinRange) {
        toast.success("Lokasi Anda dalam jangkauan 500 meter dari ODP terdekat!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warning(`Lokasi Anda di luar jangkauan 500 meter. Jarak ke ODP terdekat: ${nearestDistance.toFixed(2)} meter`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    setFormData({
      coordinates: `${lat}, ${lon}`,
      totalDistance: nearestDistance.toFixed(2),
      detailedAddress: displayName,
    });

    setLocationDetails({
      coordinates: `${lat}, ${lon}`,
      address: displayName,
      nearestLocation: nearestLoc,
      distanceToNearest: nearestDistance.toFixed(2),
    });

    setNearestLocation(nearestLoc);
    setIsButtonDisabled(false);
    
    // Zoom map untuk menampilkan semua marker
    if (nearestLoc) {
      const bounds = L.latLngBounds([
        [lat, lon],
        [nearestLoc.lat, nearestLoc.lon]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([lat, lon], 16);
    }
  };

  const handleSelectLocation = async (lat, lon, displayName) => {
    if (!lat || !lon) {
      toast.error("Koordinat tidak valid");
      return;
    }
    await updateMapLocation(lat, lon, displayName);
    setSearchResults([]);
  };

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (isNaN(latitude) || isNaN(longitude)) {
            toast.error("Koordinat lokasi saat ini tidak valid.");
            return;
          }
          const address = await getAddressFromCoordinates(latitude, longitude);
          await updateMapLocation(latitude, longitude, address || "Lokasi Saat Ini");
        },
        (error) => {
          toast.error("Gagal mendapatkan lokasi: " + error.message, {
            style: {
              background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
              color: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            },
          });
        }
      );
    } else {
      toast.error("Geolokasi tidak didukung oleh browser Anda.");
    }
  };

  useEffect(() => {
    if (!map) {
      const initialMap = L.map("map").setView([-7.5801076, 110.765559], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(initialMap);
      setMap(initialMap);
      fetchLocations();

      initialMap.on("click", async (e) => {
        const clickedLat = e.latlng.lat;
        const clickedLon = e.latlng.lng;
        const clickedDisplayName = await getAddressFromCoordinates(
          clickedLat,
          clickedLon
        );
        await updateMapLocation(
          clickedLat,
          clickedLon,
          clickedDisplayName || "Lokasi Tidak Dikenali"
        );
      });
    }
  }, [map]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.coordinates) {
        toast.error("Anda harus memilih lokasi terlebih dahulu.");
        return;
    }

    if (!isWithinRange) {
      toast.error("Maaf, lokasi Anda berada di luar jangkauan 500 meter dari ODP terdekat.");
      return;
    }

    // Redirecting to Packages page, passing coordinates in query params
    Inertia.visit(`/packages?location_maps=${encodeURIComponent(formData.coordinates)}`);
  };

  return (
    <AuthenticatedLayout>
      <AppLayout>
        <Title />
        <div className="min-h-screen bg-gray-100 text-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto py-8 md:py-12 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-gray-800 relative">
              <span className="relative z-10">
                Cek Apakah Lokasi Anda Termasuk Dalam Jangkauan Kami
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-lg"></span>
            </h1>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-700 hover:text-gray-900">
              Masukkan Alamat Pemasangan Anda (Disarankan menggunakan Titik
              Koordinat Lokasi Anda)
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
                className="pl-10 pr-4 py-3 text-gray-800 bg-white border rounded-lg shadow-sm w-full"
              />
              {searchResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-white shadow-md rounded-lg max-h-60 overflow-auto">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 border-b"
                      onClick={() =>
                        handleSelectLocation(
                          result.lat,
                          result.lon,
                          result.display_name
                        )
                      }
                    >
                      {result.display_name}
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
            <div
              id="map"
              className="map-container border border-gray-200 shadow-lg w-full h-72 md:h-96 rounded-lg mb-6"
            ></div>
            
            {locationDetails && (
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center justify-center">
                  <span className="material-icons text-blue-600 mr-2"></span>
                  Detail Lokasi:
                </h3>
                <div className="text-sm sm:text-base space-y-3">
                  <p className="flex items-center justify-center mb-1">
                    <span className="material-icons text-green-500 mr-2"></span>
                    <strong>Alamat: </strong> {locationDetails.address}
                  </p>
                  <p className="flex items-center justify-center mb-1">
                    <span className="material-icons text-yellow-500 mr-2"></span>
                    <strong>Koordinat: </strong> {locationDetails.coordinates}
                  </p>
                  {nearestLocation && (
                    <>
                      <p className="flex items-center justify-center mb-1">
                        <span className="material-icons text-red-500 mr-2"></span>
                        <strong>ODP Terdekat: </strong> {nearestLocation.site_name}
                      </p>
                      <p className="flex items-center justify-center mb-1">
                        <span className="material-icons text-purple-500 mr-2"></span>
                        <strong>Jarak ke ODP: </strong> {locationDetails.distanceToNearest} meter
                      </p>
                      <div className={`p-3 rounded-lg ${isWithinRange ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <strong>
                          {isWithinRange ? (
                            <>
                              <FaCheckCircle className="inline mr-2" />
                              Lokasi Anda dalam jangkauan 500 meter dari ODP
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="inline mr-2" />
                              Lokasi Anda di luar jangkauan 500 meter dari ODP
                            </>
                          )}
                        </strong>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isButtonDisabled || !isWithinRange}
                className={`w-full max-w-xs py-3 rounded-lg font-bold text-white flex items-center justify-center transition-transform transform duration-200 ${
                  isButtonDisabled || !isWithinRange
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 hover:scale-105"
                }`}
              >
                <FaCheckCircle className="mr-2" />
                Lanjutkan ke Paket Layanan
              </button>
            </form>
          </div>
          <ToastContainer 
            transition={Slide} 
            position="top-center"
            autoClose={5000}
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