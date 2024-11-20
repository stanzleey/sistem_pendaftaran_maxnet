import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Index({ customers }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Admin - Customers" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers List</h1>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by customer name..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 border-b text-left text-gray-600">ID</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Phone Number</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Address</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Installation Address</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Location Maps</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Selected Service</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.id}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.name}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.phone_number}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.ktp_address}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.installation_address}</td>
                                            {/* Display Location Maps as plain text */}
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.location_maps}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{customer.service_name}</td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/Admin/customers/${customer.id}`}
                                                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/Admin/customers/${customer.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="py-4 px-6 text-center text-gray-600">
                                            No customers found.
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
