import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';

export default function Index({ services, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState('');

    // Function to filter services based on search term
    const filteredServices = services.filter(service =>
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle delete action
    const handleDelete = (serv_id) => {
        if (confirm("Are you sure you want to delete this service?")) {
            Inertia.delete(`/Admin/services/${serv_id}`, {
                onSuccess: () => {
                    setNotification('Service deleted successfully.'); // Set notification on success
                }
            });
        }
    };
    

    // Set initial notification if passed from the server
    React.useEffect(() => {
        if (flash?.message) {
            setNotification(flash.message);
        }
    }, [flash]);

    return (
        <>
            <Head title="Admin - Services" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Services List</h1>
                        <Link href="/Admin/services/create" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Create New Service
                        </Link>
                    </div>

                    {/* Notification */}
                    {notification && (
                        <div className="mb-4 p-3 text-white bg-green-500 rounded">
                            {notification}
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by service name..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Service ID</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Service Name</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Speed</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Description</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Price</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Discount</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Visible</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => (
                                        <tr key={service.serv_id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="py-3 px-4 border-b text-gray-700">{service.serv_id}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{service.service_name}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{service.service_speed}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{service.service_description}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">Rp {service.service_price}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{service.service_discount}</td>
                                            <td className="py-3 px-4 border-b">
                                                {service.is_visible ? (
                                                    <span className="text-green-600 font-semibold">Yes</span>
                                                ) : (
                                                    <span className="text-red-600 font-semibold">No</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/Admin/services/${service.serv_id}/edit`}
                                                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(service.serv_id)}
                                                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="py-4 px-6 text-center text-gray-600">
                                            No services found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
