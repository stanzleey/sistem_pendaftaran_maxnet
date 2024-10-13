import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Index({ messages }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this message?")) {
            Inertia.delete(`/admin/messages/${id}`);
        }
    };

    return (
        <>
            <Head title="Admin - Messages" />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Message List</h1>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Email</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Phone</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Message</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map((message) => (
                                        <tr 
                                            key={message.id} 
                                            className={`hover:bg-gray-50 transition duration-150 ${
                                                message.isRead ? 'bg-gray-200' : 'bg-white'
                                            }`}
                                        >
                                            <td className="py-3 px-4 border-b text-gray-700">{message.name}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{message.email}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{message.phone}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{message.message}</td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex space-x-2">
                                                <Link
                                                    href={route('messages.show', message.id)}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                        href={`/Admin/messages/${message.id}`}
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
                                        <td colSpan="5" className="py-4 px-6 text-center text-gray-600">
                                            No messages found.
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
