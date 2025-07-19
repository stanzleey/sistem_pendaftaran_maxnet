import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { FiArrowLeft, FiMail, FiPhone, FiHome, FiMapPin, FiFileText } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl relative max-w-4xl w-full max-h-[90vh] flex flex-col">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="flex-1 overflow-auto">
                    <img 
                        src={imageSrc} 
                        alt="Full size document" 
                        className="w-full h-full object-contain" 
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={onClose} 
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                    >
                        <FiArrowLeft /> Close
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
            <Head title={`Customer: ${customer.name}`} />
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />

                <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
                                <p className="text-gray-600 mt-1">Viewing details for {customer.name}</p>
                            </div>
                            <Link
                                href="/Admin/customers"
                                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                            >
                                <FiArrowLeft /> Back to List
                            </Link>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information Card */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <FiFileText /> Personal Information
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                        <p className="p-3 bg-gray-50 rounded-lg border border-gray-200">{customer.name}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                <FiMail /> Email
                                            </label>
                                            <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 break-all">{customer.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                <FiPhone /> Phone
                                            </label>
                                            <p className="p-3 bg-gray-50 rounded-lg border border-gray-200">{customer.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Information Card */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <FiHome /> Address Information
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">KTP Address</label>
                                        <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">{customer.ktp_address}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Installation Address</label>
                                        <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">{customer.installation_address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Information Card */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <FiMapPin /> Service Details
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Service Name</label>
                                        <p className="p-3 bg-gray-50 rounded-lg border border-gray-200">{customer.service_name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Location Maps</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
                                            {customer.location_maps ? (
                                                <a 
                                                    href={customer.location_maps} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline break-all"
                                                >
                                                    {customer.location_maps}
                                                </a>
                                            ) : (
                                                "Location not provided"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Card */}
                            {customer.documents && customer.documents.length > 0 && (
                                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                                        <h2 className="text-xl font-semibold">Customer Documents</h2>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 gap-4">
                                        {customer.documents.map((doc, index) => (
                                            <div key={index} className="border rounded-lg p-3 hover:shadow-md transition duration-200">
                                                <div 
                                                    className="cursor-pointer" 
                                                    onClick={() => openModal(doc.url)}
                                                >
                                                    <img 
                                                        src={doc.thumbnail || doc.url} 
                                                        alt={`Document ${index + 1}`} 
                                                        className="w-full h-32 object-cover rounded mb-2"
                                                    />
                                                    <p className="text-sm text-gray-600 truncate">{doc.name || `Document ${index + 1}`}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={activeImage} />
        </>
    );
}