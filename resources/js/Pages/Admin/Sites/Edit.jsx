import React from 'react';
import { useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ site }) {
    const { data, setData, put, errors } = useForm({
        site_id: site.site_id || '', // Automatically filled site_id
        site_name: site.site_name || '',
        site_parent: site.site_parent || '',
        site_description: site.site_description || '',
        site_type_id: site.site_type_id || '', // Keep as string (varchar)
        site_location_maps: site.site_location_maps || '',
        site_address: site.site_address || '',
        site_port_capacity: site.site_port_capacity || '',
        site_picture: null, // New field for the picture, optional
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show confirmation dialog using SweetAlert2
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, create FormData and submit the form
                const formDataToSend = new FormData();
                Object.keys(data).forEach(key => {
                    formDataToSend.append(key, data[key]);
                });

                // Send a PUT request to update the site
                put(route('sites.update', site.site_id), {
                    data: formDataToSend,
                    onSuccess: () => {
                        Swal.fire({
                            title: "Saved!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000 // Automatically closes after 2 seconds
                        });
                    },
                    onError: (errors) => {
                        Swal.fire("Update failed!", "Please check the form and try again.", "error");
                    }
                });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-grow bg-gray-100 py-10 px-6 sm:px-10">
                <Head title="Edit Site" />

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Edit Site</h2>

                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Site ID (read-only) */}
                            <div>
                                <label htmlFor="site_id" className="block text-sm font-medium text-gray-700">Site ID</label>
                                <input
                                    id="site_id"
                                    name="site_id"
                                    type="text"
                                    value={data.site_id}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                                />
                            </div>

                            {/* Site Name */}
                            <div>
                                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">Site Name</label>
                                <input
                                    id="site_name"
                                    name="site_name"
                                    type="text"
                                    value={data.site_name}
                                    onChange={e => setData('site_name', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_name ? 'border-red-500' : ''}`}
                                    placeholder="Enter Site Name"
                                    required
                                />
                                {errors.site_name && <span className="text-red-500 text-sm">{errors.site_name}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Site Parent */}
                            <div>
                                <label htmlFor="site_parent" className="block text-sm font-medium text-gray-700">Site Parent</label>
                                <input
                                    id="site_parent"
                                    name="site_parent"
                                    type="text"
                                    value={data.site_parent}
                                    onChange={e => setData('site_parent', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_parent ? 'border-red-500' : ''}`}
                                    placeholder="Enter Site Parent (optional)"
                                />
                                {errors.site_parent && <span className="text-red-500 text-sm">{errors.site_parent}</span>}
                            </div>
                            {/* Site Type ID */}
                            <div>
                                <label htmlFor="site_type_id" className="block text-sm font-medium text-gray-700">Site Type ID</label>
                                <input
                                    id="site_type_id"
                                    name="site_type_id"
                                    type="text"
                                    value={data.site_type_id}
                                    onChange={e => setData('site_type_id', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_type_id ? 'border-red-500' : ''}`}
                                    placeholder="Enter Site Type ID"
                                    required
                                />
                                {errors.site_type_id && <span className="text-red-500 text-sm">{errors.site_type_id}</span>}
                            </div>
                        </div>

                        {/* Other input fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Site Address */}
                            <div>
                                <label htmlFor="site_address" className="block text-sm font-medium text-gray-700">Site Address</label>
                                <input
                                    id="site_address"
                                    name="site_address"
                                    type="text"
                                    value={data.site_address}
                                    onChange={e => setData('site_address', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_address ? 'border-red-500' : ''}`}
                                    placeholder="Enter Site Address"
                                />
                                {errors.site_address && <span className="text-red-500 text-sm">{errors.site_address}</span>}
                            </div>

                            {/* Site Port Capacity */}
                            <div>
                                <label htmlFor="site_port_capacity" className="block text-sm font-medium text-gray-700">Port Capacity</label>
                                <input
                                    id="site_port_capacity"
                                    name="site_port_capacity"
                                    type="number"
                                    value={data.site_port_capacity}
                                    onChange={e => setData('site_port_capacity', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_port_capacity ? 'border-red-500' : ''}`}
                                    placeholder="Enter Port Capacity"
                                />
                                {errors.site_port_capacity && <span className="text-red-500 text-sm">{errors.site_port_capacity}</span>}
                            </div>
                        </div>

                        {/* Site Description */}
                        <div>
                            <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">Site Description</label>
                            <textarea
                                id="site_description"
                                name="site_description"
                                value={data.site_description}
                                onChange={e => setData('site_description', e.target.value)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_description ? 'border-red-500' : ''}`}
                                placeholder="Enter Site Description"
                                rows="4"
                            />
                            {errors.site_description && <span className="text-red-500 text-sm">{errors.site_description}</span>}
                        </div>

                        {/* Site Location Maps */}
                        <div>
                            <label htmlFor="site_location_maps" className="block text-sm font-medium text-gray-700">Location Maps URL</label>
                            <input
                                id="site_location_maps"
                                name="site_location_maps"
                                type="text"
                                value={data.site_location_maps}
                                onChange={e => setData('site_location_maps', e.target.value)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.site_location_maps ? 'border-red-500' : ''}`}
                                placeholder="Enter Location Maps URL"
                            />
                            {errors.site_location_maps && <span className="text-red-500 text-sm">{errors.site_location_maps}</span>}
                        </div>

                        {/* Site Picture */}
                        <div>
                            <label htmlFor="site_picture" className="block text-sm font-medium text-gray-700">Site Picture</label>
                            <input
                                id="site_picture"
                                name="site_picture"
                                type="file"
                                accept="image/*"
                                onChange={e => setData('site_picture', e.target.files[0])}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.site_picture && <span className="text-red-500 text-sm">{errors.site_picture}</span>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Site
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
