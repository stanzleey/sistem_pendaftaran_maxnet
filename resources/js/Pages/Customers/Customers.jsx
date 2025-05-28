import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '@/Layouts/Title';

const Customers = () => {
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        ktp_address: '',
        installation_address: '',
        location_maps: '',
        service_name: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const setSelectedPackage = params.get('package');
        const selectedLocation = params.get('location_maps');

        setData((prevData) => ({
            ...prevData,
            service_name: setSelectedPackage || prevData.service_name,
            location_maps: selectedLocation || prevData.location_maps,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validasi untuk kolom No HP
        if (name === 'phone_number') {
            if (!/^\d*$/.test(value)) {
                toast.error('Nomor HP hanya boleh mengandung angka!', {
                    style: {
                        background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
                return;
            }
        }
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        post('/admin/customers', {
            onSuccess: () => {
                reset();
                toast.success('Registrasi berhasil!', {
                    style: {
                        background: 'linear-gradient(45deg, #56ab2f, #a8e063)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
                setTimeout(() => {
                    window.location.href = '/customers/thankyou';
                }, 2000); 
            },
            onError: (errors) => {
                console.log(errors);
                toast.error('Registrasi gagal!', {
                    style: {
                        background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
            },
        });
    };    

    return (
        <AppLayout>
            <Title />
            <div className="flex flex-col min-h-screen relative bg-gray-50">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 to-sky-500"></div>
                
                {/* Main content */}
                <div className="flex-grow relative z-10 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Card container */}
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Card header */}
                            <div className="bg-gradient-to-r from-teal-500 to-sky-600 p-6 text-white">
                                <h1 className="text-3xl font-bold text-center">Form Pendaftaran Pelanggan</h1>
                                <p className="text-center text-teal-100 mt-2">
                                    Lengkapi data berikut untuk mendaftar layanan kami
                                </p>
                            </div>

                            {/* Card body */}
                            <div className="p-8">
                                {/* Selected Package Alert */}
                                {data.service_name && (
                                    <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg text-center text-teal-700 flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                        </svg>
                                        <strong>Paket yang Dipilih:</strong> <span className="ml-1 font-semibold">{data.service_name}</span>
                                    </div>
                                )}

                                {/* Error Messages */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <h3 className="text-red-700 font-medium mb-2 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Terdapat kesalahan
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 text-red-600 text-sm">
                                            {Object.values(errors).map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Row 1 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Lengkap
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    placeholder="Nama lengkap sesuai KTP"
                                                    required
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    placeholder="Alamat email aktif"
                                                    required
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nomor HP
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone_number"
                                                    value={data.phone_number}
                                                    onChange={handleChange}
                                                    placeholder="Contoh: 081234567890"
                                                    required
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Alamat KTP
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="ktp_address"
                                                value={data.ktp_address}
                                                onChange={handleChange}
                                                placeholder="Alamat sesuai KTP"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Alamat Pemasangan
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <textarea
                                                name="installation_address"
                                                value={data.installation_address}
                                                onChange={handleChange}
                                                placeholder="Alamat lengkap lokasi pemasangan"
                                                required
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Lokasi Maps
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="location_maps"
                                                    value={data.location_maps}
                                                    onChange={handleChange}
                                                    placeholder="URL Google Maps atau koordinat GPS"
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Contoh koordinat: -6.175392, 106.827153
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Daftar Sekarang
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    transition={Slide}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </AppLayout>
    );
};

export default Customers;