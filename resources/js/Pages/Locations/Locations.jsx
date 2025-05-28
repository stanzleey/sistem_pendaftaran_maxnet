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
  FaLocationArrow,
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

    // Custom icon for user location
    const userIcon = L.divIcon({
      className: 'user-location-icon',
      html: `<div class="animate-pulse"><div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white"><FaMapMarkerAlt class="text-xl"/></div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    // Add marker for selected location with custom icon
    const newMarker = L.marker(selectedCoords, {
      draggable: true,
      icon: userIcon
    })
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

    // Add radius circle (500m)
    const rangeCircle = L.circle(selectedCoords, {
      color: "#4f46e5",
      fillColor: "#6366f1",
      fillOpacity: 0.2,
      radius: 500,
      weight: 2
    }).addTo(map);

    rangeCircle.bindPopup("Jangkauan 500 meter dari lokasi Anda");

    let nearestDistance = Infinity;
    let nearestLoc = null;

    // Custom icon for ODP locations
    const odpIcon = L.divIcon({
      className: 'odp-location-icon',
      html: `<div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white"><FaMapMarkerAlt class="text-sm"/></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });

    // Add markers for all ODPs
    locations.forEach((location) => {
      const locationLatLng = L.latLng(location.lat, location.lon);
      const marker = L.marker([location.lat, location.lon], {
        icon: odpIcon
      })
        .addTo(map)
        .bindPopup(`<b>${location.site_name}</b><br>${location.site_address}`);
      
      const distance = locationLatLng.distanceTo(L.latLng(lat, lon));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLoc = location;
      }
    });

    // If nearest ODP exists, add connection line
    if (nearestLoc) {
      const nearestLatLng = L.latLng(nearestLoc.lat, nearestLoc.lon);
      const selectedLatLng = L.latLng(lat, lon);
      
      const connectionLine = L.polyline([selectedLatLng, nearestLatLng], {
        color: "#ef4444",
        weight: 3,
        dashArray: "8, 8",
      }).addTo(map);
      
      connectionLine.bindPopup(`Jarak ke ODP terdekat: ${nearestDistance.toFixed(2)} meter`);

      const withinRange = nearestDistance <= 500;
      setIsWithinRange(withinRange);
      
      if (withinRange) {
        toast.success("🎉 Lokasi Anda dalam jangkauan 500 meter dari ODP terdekat!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          className: "bg-green-600 text-white"
        });
      } else {
        toast.warning(`⚠️ Lokasi Anda ${nearestDistance.toFixed(2)} meter dari ODP terdekat (di luar jangkauan 500m)`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          className: "bg-yellow-600 text-white"
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
    
    // Zoom map to show all markers
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
            className: "bg-red-600 text-white"
          });
        }
      );
    } else {
      toast.error("Geolokasi tidak didukung oleh browser Anda.", {
        className: "bg-red-600 text-white"
      });
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

    Inertia.visit(`/packages?location_maps=${encodeURIComponent(formData.coordinates)}`);
  };

  return (
    <AuthenticatedLayout>
      <AppLayout>
        <Title />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Cek Jangkauan Layanan
                </span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-100 rounded-full"></span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Masukkan alamat atau gunakan lokasi Anda saat ini untuk memeriksa ketersediaan layanan kami
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaSearch className="text-lg" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Cari alamat atau nama jalan..."
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 transition duration-150"
                      />
                      {searchResults.length > 0 && (
                        <ul className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto border border-gray-200">
                          {searchResults.map((result, index) => (
                            <li
                              key={index}
                              className="cursor-pointer px-4 py-3 hover:bg-indigo-50 border-b border-gray-100 last:border-b-0 transition duration-150 flex items-center"
                              onClick={() =>
                                handleSelectLocation(
                                  result.lat,
                                  result.lon,
                                  result.display_name
                                )
                              }
                            >
                              <FaMapMarkerAlt className="text-indigo-500 mr-2 flex-shrink-0" />
                              <span className="truncate">{result.display_name}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <button
                      onClick={handleUseCurrentLocation}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 mb-6"
                    >
                      <FaLocationArrow className="text-white" />
                      <span>Gunakan Lokasi Saya</span>
                    </button>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center">
                        <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                        Petunjuk Penggunaan
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block bg-indigo-100 text-indigo-800 rounded-full p-1 mr-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Cari alamat atau klik pada peta untuk menentukan lokasi
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-indigo-100 text-indigo-800 rounded-full p-1 mr-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Lingkaran biru menunjukkan jangkauan 500 meter dari lokasi Anda
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-indigo-100 text-indigo-800 rounded-full p-1 mr-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Titik hijau menunjukkan lokasi ODP terdekat
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div id="map" className="h-96 w-full rounded-lg border border-gray-200 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {locationDetails && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaMapMarkerAlt className="text-indigo-500 mr-3" />
                    Detail Lokasi
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                      <h4 className="font-semibold text-indigo-800 mb-3">Lokasi Anda</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Alamat</p>
                          <p className="font-medium text-gray-900">{locationDetails.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Koordinat</p>
                          <p className="font-medium text-gray-900">{locationDetails.coordinates}</p>
                        </div>
                      </div>
                    </div>

                    {nearestLocation && (
                      <div className={`p-5 rounded-lg border ${isWithinRange ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                        <h4 className="font-semibold mb-3 flex items-center">
                          {isWithinRange ? (
                            <>
                              <FaCheckCircle className="text-green-500 mr-2" />
                              <span className="text-green-800">ODP Terdekat</span>
                            </>
                          ) : (
                            <>
                              <FaExclamationTriangle className="text-yellow-500 mr-2" />
                              <span className="text-yellow-800">ODP Terdekat</span>
                            </>
                          )}
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Nama ODP</p>
                            <p className="font-medium text-gray-900">{nearestLocation.site_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Jarak</p>
                            <p className="font-medium text-gray-900">{locationDetails.distanceToNearest} meter</p>
                          </div>
                          <div className={`mt-4 p-3 rounded-md text-center ${isWithinRange ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <p className="font-semibold">
                              {isWithinRange ? (
                                "Lokasi Anda dalam jangkauan layanan"
                              ) : (
                                "Lokasi Anda di luar jangkauan standar (500m)"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isButtonDisabled || !isWithinRange}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isButtonDisabled || !isWithinRange
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-xl"
                }`}
              >
                <FaCheckCircle className="mr-3" />
                Lanjutkan ke Pilihan Paket
              </button>
            </div>
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
            toastClassName="shadow-lg"
            progressClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
      </AppLayout>
    </AuthenticatedLayout>
  );
}