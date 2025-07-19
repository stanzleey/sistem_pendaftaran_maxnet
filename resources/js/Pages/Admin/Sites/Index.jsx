import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import Swal from 'sweetalert2';

export default function Index({ sites, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState('');

    const filteredSites = sites.filter(site =>
        site.site_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (siteId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await Inertia.delete(`/Admin/sites/${siteId}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your site has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the site.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            } catch (error) {
                console.error("Error deleting site:", error);
                Swal.fire({
                    title: "Error!",
                    text: "An unexpected error occurred.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }
    };

    useEffect(() => {
        if (flash?.message) {
            Swal.fire({
                title: "Notification",
                text: flash.message,
                icon: "info",
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Admin - Sites" />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-8 ml-64">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Site Management</h1>
                                <p className="text-gray-600 mt-2">Manage your network sites and locations</p>
                            </div>
                            <Link 
                                href="/Admin/sites/create" 
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center mt-4 md:mt-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Site
                            </Link>
                        </div>

                        {/* Search and Stats Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="relative w-full md:w-96">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search sites..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                    <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                        <p className="text-sm text-gray-600">Total Sites</p>
                                        <p className="text-xl font-semibold text-blue-600">{sites.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sites Table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port Capacity</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredSites.length > 0 ? (
                                            filteredSites.map((site) => (
                                                <tr key={site.site_id} className="hover:bg-gray-50 transition duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {site.site_picture ? (
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img 
                                                                        src={`/uploads/${site.site_picture}`} 
                                                                        alt="Site" 
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{site.site_name}</div>
                                                                <div className="text-sm text-gray-500">Type: {site.site_type_id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{site.site_parent || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">{site.site_description}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">{site.site_address}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-medium">{site.site_port_capacity}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={`/Admin/sites/${site.site_id}/edit`}
                                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition duration-300 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(site.site_id)}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition duration-300 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center">
                                                    <div className="text-gray-500 py-8">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="mt-2 text-lg font-medium">No sites found</p>
                                                        <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}