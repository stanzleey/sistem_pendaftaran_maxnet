import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

// Modal Component
const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-lg mx-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </button>
                <img src={imageSrc} alt="Full size" className="max-w-full max-h-[80vh] object-contain" />
                <div className="flex justify-center mt-4">
                    <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function View({ customer }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState('');

    const openModal = (imageSrc) => {
        setActiveImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveImage('');
    };

    return (
        <>
            <Head title="View Customer" />
            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-8 bg-gray-50 shadow-lg rounded-lg ml-64">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Customer Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Information Cards */}
                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Name</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.name}</p>
                        </div>

                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.email}</p>
                        </div>

                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Phone Number</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.phone_number}</p>
                        </div>

                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">KTP Address</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.ktp_address}</p>
                        </div>

                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Installation Address</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.installation_address}</p>
                        </div>

                        {/* Update Location Maps to Text */}
                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Location Maps</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.location_maps || "Location not available"}</p>
                        </div>

                        <div className="border rounded-lg bg-white shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Service Name</h2>
                            <p className="p-3 border border-gray-300 rounded">{customer.service_name}</p>
                        </div>    
                    </div>

                    <div className="flex justify-end mt-8">
                        <Link
                            href="/Admin/customers" // Ensure this route exists in your Laravel application
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Back to Customers List
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal for Full-Size Image */}
            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={activeImage} />
        </>
    );
}
