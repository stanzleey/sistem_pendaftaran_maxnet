import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '@/Layouts/Title';
import { FaCheckCircle, FaArrowLeft, FaWifi, FaMoneyBillWave, FaBolt, FaFileInvoice } from 'react-icons/fa';

const Customers = () => {
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        ktp_address: '',
        installation_address: '',
        location_maps: '',
        service_name: '',
        service_price: '',
        service_speed: ''
    });

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const packageName = params.get('package');
        const selectedLocation = params.get('location_maps');

        if (packageName) {
            const fetchPackageDetails = async () => {
                try {
                    const response = await axios.get('/api/services');
                    const foundPackage = response.data.find(
                        service => service.service_name === decodeURIComponent(packageName)
                    );
                    
                    if (foundPackage) {
                        setSelectedPackage(foundPackage);
                        setData({
                            ...data,
                            service_name: foundPackage.service_name,
                            service_price: foundPackage.service_price,
                            service_speed: foundPackage.service_speed,
                            location_maps: selectedLocation || ''
                        });
                    }
                } catch (error) {
                    console.error('Error fetching package details:', error);
                }
            };
            
            fetchPackageDetails();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_number') {
            if (!/^\d*$/.test(value)) {
                toast.error('Nomor HP hanya boleh mengandung angka!');
                return;
            }
        }
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        post('/admin/customers', {
            onSuccess: () => {
                setInvoiceData({
                    ...data,
                    invoiceNumber: `INV-${Date.now()}`,
                    date: new Date().toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                });
                setShowInvoice(true);
                toast.success('Registrasi berhasil!');
            },
            onError: (errors) => {
                console.log(errors);
                toast.error('Registrasi gagal!');
            },
        });
    };

    const formatPrice = (price) => {
        return `Rp ${new Intl.NumberFormat('id-ID').format(price)}/bulan`;
    };

    const goBackToPackages = () => {
        window.location.href = `/packages${data.location_maps ? `?location_maps=${encodeURIComponent(data.location_maps)}` : ''}`;
    };

    return (
        <AppLayout>
            <Title />
            <div className="flex flex-col min-h-screen relative bg-gray-50">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 to-sky-500"></div>
                
                <div className="flex-grow relative z-10 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button 
                            onClick={goBackToPackages}
                            className="flex items-center text-sky-600 hover:text-sky-800 mb-6"
                        >
                            <FaArrowLeft className="mr-2" />
                            Kembali ke Pilihan Paket
                        </button>

                        {showInvoice && invoiceData ? (
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-teal-500 to-sky-600 p-6 text-white">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h1 className="text-3xl font-bold">Invoice</h1>
                                            <p className="text-teal-100 mt-1">Detail pembayaran layanan internet</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">No. Invoice</p>
                                            <p className="text-lg font-bold">{invoiceData.invoiceNumber}</p>
                                            <p className="text-sm mt-1">{invoiceData.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                                            Informasi Pelanggan
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Nama</p>
                                                <p className="font-medium">{invoiceData.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium">{invoiceData.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">No. HP</p>
                                                <p className="font-medium">{invoiceData.phone_number}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Alamat Pemasangan</p>
                                                <p className="font-medium">{invoiceData.installation_address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                                            Detail Layanan
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket Layanan</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kecepatan</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <FaWifi className="flex-shrink-0 h-5 w-5 text-sky-500 mr-2" />
                                                                <div className="font-medium text-gray-900">{invoiceData.service_name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <FaBolt className="flex-shrink-0 h-5 w-5 text-yellow-500 mr-2" />
                                                                <div className="text-gray-900">{invoiceData.service_speed} Mbps</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                                            {formatPrice(invoiceData.service_price)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pembayaran</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Biaya Berlangganan</span>
                                                <span className="font-medium">{formatPrice(invoiceData.service_price)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Biaya Instalasi</span>
                                                <span className="font-medium">Rp 250.000</span>
                                            </div>
                                            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                                                <span className="text-lg font-semibold">Total Pembayaran</span>
                                                <span className="text-lg font-bold text-teal-600">
                                                    Rp {new Intl.NumberFormat('id-ID').format(parseInt(invoiceData.service_price) + 250000)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Instruksi Pembayaran</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                            <li>Total pembayaran dapat ditransfer melalui bank berikut:</li>
                                            <div className="ml-5 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white p-3 rounded shadow-sm">
                                                    <p className="font-medium">Bank BCA</p>
                                                    <p>No. Rekening: 1234567890</p>
                                                    <p>Atas Nama: PT. Internet Cepat</p>
                                                </div>
                                                <div className="bg-white p-3 rounded shadow-sm">
                                                    <p className="font-medium">Bank Mandiri</p>
                                                    <p>No. Rekening: 0987654321</p>
                                                    <p>Atas Nama: PT. Internet Cepat</p>
                                                </div>
                                            </div>
                                            <li>Setelah melakukan pembayaran, harap konfirmasi melalui WhatsApp ke nomor 08123456789 dengan menyertakan bukti transfer.</li>
                                            <li>Pemasangan akan dilakukan dalam 1-3 hari kerja setelah pembayaran dikonfirmasi.</li>
                                        </ol>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <a href="/">
                                            <button className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200">
                                                SELESAI
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-teal-500 to-sky-600 p-6 text-white">
                                    <h1 className="text-3xl font-bold text-center">Form Pendaftaran Pelanggan</h1>
                                    <p className="text-center text-teal-100 mt-2">
                                        Lengkapi data berikut untuk mendaftar layanan kami
                                    </p>
                                </div>

                                <div className="p-8">
                                    {selectedPackage && (
                                        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                                <FaCheckCircle className="text-teal-500 mr-2" />
                                                Paket Yang Dipilih
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                                    <div className="flex items-center">
                                                        <FaWifi className="text-sky-500 mr-2" />
                                                        <span className="font-medium">Nama Paket</span>
                                                    </div>
                                                    <p className="mt-1 text-gray-800 font-semibold">
                                                        {selectedPackage.service_name}
                                                    </p>
                                                </div>
                                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                                    <div className="flex items-center">
                                                        <FaBolt className="text-sky-500 mr-2" />
                                                        <span className="font-medium">Kecepatan</span>
                                                    </div>
                                                    <p className="mt-1 text-gray-800 font-semibold">
                                                        {selectedPackage.service_speed} Mbps
                                                    </p>
                                                </div>
                                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                                    <div className="flex items-center">
                                                        <FaMoneyBillWave className="text-sky-500 mr-2" />
                                                        <span className="font-medium">Harga</span>
                                                    </div>
                                                    <p className="mt-1 text-gray-800 font-semibold">
                                                        {formatPrice(selectedPackage.service_price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
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

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nama Lengkap
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    placeholder="Nama lengkap sesuai KTP"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    placeholder="Alamat email aktif"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nomor HP
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone_number"
                                                    value={data.phone_number}
                                                    onChange={handleChange}
                                                    placeholder="Contoh: 081234567890"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition duration-200"
                                                />
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
                                                <FaFileInvoice className="mr-2" />
                                                Daftar Sekarang
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
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