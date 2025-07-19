import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import { Head, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Create = () => {
    const { props } = usePage(); 
    const { site_id } = props;

    const [formData, setFormData] = useState({
        site_id: site_id,
        site_name: '',
        site_parent: '',
        site_description: '',
        site_type_id: '',
        site_location_maps: '',
        site_address: '',
        site_port_capacity: '',
        site_picture: null,
    });

    // State untuk map
    const [map, setMap] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showMapModal, setShowMapModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
    
        Inertia.post(route('sites.store'), form, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Site created successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    // Fungsi untuk inisialisasi peta
    useEffect(() => {
        if (showMapModal && !mapInitialized) {
            const initialMap = L.map('location-map').setView([-7.5801076, 110.765559], 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(initialMap);

            // Tambahkan event click ke peta
            initialMap.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setSelectedLocation({ lat, lng });
                
                // Hapus marker sebelumnya jika ada
                initialMap.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        initialMap.removeLayer(layer);
                    }
                });
                
                // Tambahkan marker baru
                L.marker([lat, lng]).addTo(initialMap)
                    .bindPopup(`Lokasi Terpilih: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
                    .openPopup();
            });

            setMap(initialMap);
            setMapInitialized(true);
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [showMapModal, mapInitialized]);

    // Fungsi untuk memilih lokasi dari peta
    const handleSelectLocation = () => {
        if (selectedLocation) {
            setFormData(prev => ({
                ...prev,
                site_location_maps: `${selectedLocation.lat},${selectedLocation.lng}`
            }));
            setShowMapModal(false);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Silakan pilih lokasi di peta terlebih dahulu',
            });
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-grow bg-gray-100 py-10 px-6 sm:px-10">
                <Head title="Create Site" />

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Create New Site</h2>

                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Site ID (read-only) */}
                            <div>
                                <label htmlFor="site_id" className="block text-sm font-medium text-gray-700">Site ID</label>
                                <input
                                    id="site_id"
                                    name="site_id"
                                    type="text"
                                    value={formData.site_id}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Name */}
                            <div>
                                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">Site Name</label>
                                <input
                                    id="site_name"
                                    name="site_name"
                                    type="text"
                                    value={formData.site_name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Parent */}
                            <div>
                                <label htmlFor="site_parent" className="block text-sm font-medium text-gray-700">Site Parent</label>
                                <input
                                    id="site_parent"
                                    name="site_parent"
                                    type="text"
                                    value={formData.site_parent}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Description */}
                            <div>
                                <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">Site Description</label>
                                <textarea
                                    id="site_description"
                                    name="site_description"
                                    value={formData.site_description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Type ID */}
                            <div>
                                <label htmlFor="site_type_id" className="block text-sm font-medium text-gray-700">Site Type ID</label>
                                <input
                                    id="site_type_id"
                                    name="site_type_id"
                                    type="text"
                                    value={formData.site_type_id}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Location Maps */}
                            <div className="sm:col-span-2">
                                <label htmlFor="site_location_maps" className="block text-sm font-medium text-gray-700">Site Location Maps</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        id="site_location_maps"
                                        name="site_location_maps"
                                        type="text"
                                        value={formData.site_location_maps}
                                        onChange={handleChange}
                                        required
                                        readOnly
                                        className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Pilih lokasi dari peta"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowMapModal(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Pilih di Peta
                                    </button>
                                </div>
                            </div>

                            {/* Site Address */}
                            <div>
                                <label htmlFor="site_address" className="block text-sm font-medium text-gray-700">Site Address</label>
                                <input
                                    id="site_address"
                                    name="site_address"
                                    type="text"
                                    value={formData.site_address}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Port Capacity */}
                            <div>
                                <label htmlFor="site_port_capacity" className="block text-sm font-medium text-gray-700">Site Port Capacity</label>
                                <input
                                    id="site_port_capacity"
                                    name="site_port_capacity"
                                    type="number"
                                    value={formData.site_port_capacity}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Site Picture */}
                            <div>
                                <label htmlFor="site_picture" className="block text-sm font-medium text-gray-700">Site Picture</label>
                                <input
                                    id="site_picture"
                                    name="site_picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Site
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal Peta */}
            {showMapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Pilih Lokasi di Peta</h3>
                        </div>
                        <div className="p-4 flex-grow">
                            <div id="location-map" className="w-full h-96 rounded-md"></div>
                            <div className="mt-4 text-sm text-gray-500">
                                Klik pada peta untuk memilih lokasi. Koordinat yang dipilih: 
                                {selectedLocation ? ` ${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}` : ' Belum dipilih'}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowMapModal(false)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSelectLocation}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Pilih Lokasi Ini
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Create;