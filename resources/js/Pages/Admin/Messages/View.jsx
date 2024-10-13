import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';


export default function View({ message }) {
    return (
        <>
            <Head title={`View Message - ${message.name}`} />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-50 shadow-md rounded-lg ml-64">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Message Details</h1>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">From: {message.name}</h2>
                        <p className="text-gray-700"><strong>Email:</strong> {message.email}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {message.phone}</p>
                        
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Message:</p>
                            <p className="border rounded p-4 bg-gray-100 text-gray-800">{message.message}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route('messages.index')} // Update this line to use Ziggy's route helper
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                        >
                            Back to Messages
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
