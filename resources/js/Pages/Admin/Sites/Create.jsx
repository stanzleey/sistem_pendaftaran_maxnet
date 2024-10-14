import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import { Head, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert

const Create = () => {
    // Retrieve site_id from Inertia props sent from the backend
    const { props } = usePage(); 
    const { site_id } = props;

    const [formData, setFormData] = useState({
        site_id: site_id, // Include site_id in formData
        site_name: '',
        site_parent: '',
        site_description: '',
        site_type_id: '',
        site_location_maps: '',
        site_address: '',
        site_port_capacity: '',
        site_picture: null,
    });

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
                // Show success notification
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
                            <div>
                                <label htmlFor="site_location_maps" className="block text-sm font-medium text-gray-700">Site Location Maps</label>
                                <input
                                    id="site_location_maps"
                                    name="site_location_maps"
                                    type="text"
                                    value={formData.site_location_maps}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
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
        </div>
    );
};

export default Create;
