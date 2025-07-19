import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/Layouts/AppLayout';
import ReactPaginate from 'react-paginate';
import { FaDollarSign, FaBolt, FaInfoCircle, FaWifi, FaClock, FaShieldAlt } from 'react-icons/fa';
import Title from '@/Layouts/Title';

const Packages = () => {
    const [services, setServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    // Default images with more variety
    const defaultImages = [
        '/img/gambar 1.jpg',
        '/img/gambar 2.jpg',
        '/img/gambar 3.jpg',
        '/img/gambar 4.jpg',
        '/img/gambar 5.jpg',
        '/img/gambar 6.jpg',
        '/img/gambar 7.jpg',
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/api/services');
                const sortedServices = response.data.sort((a, b) => a.service_speed - b.service_speed);
                setServices(sortedServices);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);
    
    const [locationMaps, setLocationMaps] = useState('');
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const location = params.get('location_maps');
        if (location) {
            setLocationMaps(location);
        }
    }, []);    

    const handleSelectPackage = (service) => {
        if (service.service_name && locationMaps) {
            Inertia.visit(`/customers?package=${encodeURIComponent(service.service_name)}&location_maps=${encodeURIComponent(locationMaps)}`);
        }
    };    

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatPrice = (price) => {
        return `Rp ${new Intl.NumberFormat('id-ID').format(price)}/bulan`;
    };

    // Calculate current items based on pagination
    const offset = currentPage * itemsPerPage;
    const currentItems = services.slice(offset, offset + itemsPerPage);

    return (
        <AppLayout>
            <Title />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-8 px-4 sm:px-6">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto text-center mb-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                       Paket Internet <span className="text-blue-600">Maxnet</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Pilih paket internet terbaik untuk kebutuhan Anda dengan kecepatan tinggi dan harga terjangkau
                    </p>
                </div>
                
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <FaWifi className="text-blue-500 mr-2 text-sm" />
                        Semua Paket Internet
                    </h2>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="animate-pulse h-32 bg-gray-200"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentItems.map((service, index) => {
                                    const imageIndex = index % defaultImages.length;
                                    const isPopular = service.service_speed > 100;

                                    return (
                                        <div
                                            key={`${service.id}-${index}`}
                                            className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.02] transition-all ${isPopular ? 'border-t-2 border-yellow-400' : ''}`}
                                        >
                                            <div className="relative h-32 overflow-hidden">
                                                <img
                                                    src={service.image_url || defaultImages[imageIndex]}
                                                    alt={service.service_name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {isPopular && (
                                                    <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                                        POPULER
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                    {service.service_name}
                                                </h3>

                                                <div className="space-y-2 mb-3">
                                                    <div className="flex items-center text-sm">
                                                        <FaBolt className="text-blue-500 mr-1 text-xs" />
                                                        <span className="text-gray-700">
                                                            {service.service_speed} Mbps
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <FaClock className="text-blue-500 mr-1 text-xs" />
                                                        <span className="text-gray-700">
                                                            Unlimited 24/7
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mb-3 text-center">
                                                    <span className="text-xl font-bold text-blue-600">
                                                        {formatPrice(service.service_price)}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => handleSelectPackage(service)}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white py-1.5 rounded-md font-medium hover:from-blue-700 hover:to-blue-700 transition flex items-center justify-center text-sm"
                                                >
                                                    <FaInfoCircle className="mr-1 text-xs" />
                                                    Pilih Paket
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="mt-8">
                                <ReactPaginate
                                    previousLabel={'← Sebelumnya'}
                                    nextLabel={'Selanjutnya →'}
                                    pageCount={Math.ceil(services.length / itemsPerPage)}
                                    onPageChange={handlePageChange}
                                    containerClassName={'flex justify-center items-center space-x-2'}
                                    activeClassName={'bg-blue-600 text-white'}
                                    pageClassName={
                                        'flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm hover:bg-gray-100 transition text-sm'
                                    }
                                    previousClassName={
                                        'px-3 py-1 rounded-md bg-white shadow-sm hover:bg-gray-100 transition text-sm'
                                    }
                                    nextClassName={
                                        'px-3 py-1 rounded-md bg-white shadow-sm hover:bg-gray-100 transition text-sm'
                                    }
                                    disabledClassName={'opacity-50 cursor-not-allowed'}
                                    breakClassName={
                                        'flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-sm'
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto mt-12 bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                        Keunggulan Layanan Maxnet
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaBolt className="text-blue-600 text-lg" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Kecepatan Tinggi</h3>
                            <p className="text-gray-600 text-sm">Internet super cepat tanpa buffering</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaClock className="text-blue-600 text-lg" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Stabil 24/7</h3>
                            <p className="text-gray-600 text-sm">Uptime 99.9% dengan jaringan stabil</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaShieldAlt className="text-blue-600 text-lg" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Aman & Terjamin</h3>
                            <p className="text-gray-600 text-sm">Proteksi untuk keamanan data Anda</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Packages;