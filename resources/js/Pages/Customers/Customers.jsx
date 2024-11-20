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
            <div className="flex flex-col min-h-screen relative">
                {/* Background Overlay */}
                <div className="absolute inset-0 z-0 opacity-25">
                    <div className="animate-pulse h-full w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 opacity-75"></div>
                </div>

                <div className="flex-grow relative z-10">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-12 mb-10">
                        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Form Pendaftaran Pelanggan</h1>

                        {/* Selected Package Alert */}
                        {data.service_name && (
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded-md text-center text-blue-700">
                                <strong>Paket yang Dipilih:</strong> {data.service_name}
                            </div>
                        )}

                        {/* Error Messages */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-6 space-y-2">
                                {Object.values(errors).map((error, index) => (
                                    <div key={index} className="text-red-500 text-sm text-center">{error}</div>
                                ))}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Nama</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Nama"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">No HP</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={data.phone_number}
                                        onChange={handleChange}
                                        placeholder="No HP"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Alamat KTP</label>
                                    <input
                                        type="text"
                                        name="ktp_address"
                                        value={data.ktp_address}
                                        onChange={handleChange}
                                        placeholder="Alamat KTP"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Alamat Pemasangan</label>
                                    <input
                                        type="text"
                                        name="installation_address"
                                        value={data.installation_address}
                                        onChange={handleChange}
                                        placeholder="Alamat Pemasangan"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Location Maps (URL/Coordinate)</label>
                                    <input
                                        type="text"
                                        name="location_maps"
                                        value={data.location_maps}
                                        onChange={handleChange}
                                        placeholder="Masukkan URL atau Koordinat Alamat Pemasangan"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-medium text-white hover:bg-blue-700 transition duration-200"
                            >
                                Daftar
                            </button>
                        </form>
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
