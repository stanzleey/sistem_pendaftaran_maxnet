import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Index({ messages }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this message?")) {
            Inertia.delete(`/admin/messages/${id}`);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const truncateText = (text, length = 50) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <>
            <Head title="Admin - Messages" />
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 p-8 ml-64">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Message Inbox</h1>
                                <p className="text-gray-600 mt-2">
                                    {messages.length} total messages • {messages.filter(m => !m.isRead).length} unread
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 w-full md:w-64">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                    <svg
                                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sender
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Contact
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Message Preview
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMessages.length > 0 ? (
                                            filteredMessages.map((message) => (
                                                <tr 
                                                    key={message.id} 
                                                    className={`hover:bg-gray-50 transition duration-150 ${
                                                        !message.isRead ? 'bg-blue-50' : ''
                                                    }`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                                                !message.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                                <span className="font-medium">
                                                                    {message.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className={`text-sm font-medium ${
                                                                    !message.isRead ? 'text-blue-600' : 'text-gray-900'
                                                                }`}>
                                                                    {message.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{message.email}</div>
                                                        <div className="text-sm text-gray-500">{message.phone || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{truncateText(message.message)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{formatDate(message.created_at)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route('messages.show', message.id)}
                                                                className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition duration-200"
                                                            >
                                                                View
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(message.id)}
                                                                className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition duration-200"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center">
                                                    <div className="text-gray-500 py-8">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                
                                                                strokeWidth="1"
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {searchTerm ? 'Try a different search term' : 'No messages have been received yet'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {filteredMessages.length > 0 && (
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                                <div>
                                    Showing <span className="font-medium">{filteredMessages.length}</span> of{' '}
                                    <span className="font-medium">{messages.length}</span> messages
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50"
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}