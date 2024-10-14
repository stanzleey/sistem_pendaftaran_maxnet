import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Index({ services, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState('');

    // Filter services based on search term
    const filteredServices = services.filter(service =>
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle delete action with async/await
    const handleDelete = async (serv_id) => {
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
                await Inertia.delete(`/Admin/services/${serv_id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your service has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the service.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            } catch (error) {
                console.error("Error deleting service:", error);
                Swal.fire({
                    title: "Error!",
                    text: "An unexpected error occurred.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }
    };

    // Set initial notification from flash message
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
