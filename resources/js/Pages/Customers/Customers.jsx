import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '@/Layouts/Title';
import { FaCheckCircle, FaArrowLeft, FaWifi, FaMoneyBillWave, FaBolt, FaFileInvoice, FaCopy } from 'react-icons/fa';

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
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [selectedBank, setSelectedBank] = useState('bca');
    const [copyStatus, setCopyStatus] = useState({});

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
                const totalPayment = parseInt(data.service_price) + 250000;
                setInvoiceData({
                    ...data,
                    invoiceNumber: `INV-${Date.now()}`,
                    date: new Date().toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }),
                    totalPayment: totalPayment,
                    paymentStatus: 'pending'
                });
                setShowInvoice(true);
                toast.success('Registrasi berhasil! Silahkan lakukan pembayaran.');
            },
            onError: (errors) => {
                console.log(errors);
                toast.error('Registrasi gagal!');
            },
        });
    };

    const formatPrice = (price) => {
        return `Rp ${new Intl.NumberFormat('id-ID').format(price)}`;
    };

    const goBackToPackages = () => {
        window.location.href = `/packages${data.location_maps ? `?location_maps=${encodeURIComponent(data.location_maps)}` : ''}`;
    };

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
    };

    const copyToClipboard = (text, fieldName) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus({...copyStatus, [fieldName]: true});
            setTimeout(() => {
                setCopyStatus({...copyStatus, [fieldName]: false});
            }, 2000);
        });
    };

    const confirmPayment = () => {
        // In a real app, you would send this to your backend
        setPaymentConfirmed(true);
        setInvoiceData({
            ...invoiceData,
            paymentStatus: 'paid',
            paymentDate: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });
        toast.success('Pembayaran berhasil dikonfirmasi!');
    };

    const banks = [
        {
            id: 'bca',
            name: 'Bank BCA',
            accountNumber: '1234567890',
            accountName: 'PT. Internet Cepat',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png'
        },
        {
            id: 'mandiri',
            name: 'Bank Mandiri',
            accountNumber: '0987654321',
            accountName: 'PT. Internet Cepat',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png'
        },
        {
            id: 'bri',
            name: 'Bank BRI',
            accountNumber: '1122334455',
            accountName: 'PT. Internet Cepat',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/BRI_2020.svg/1200px-BRI_2020.svg.png'
        }
    ];

    const selectedBankData = banks.find(bank => bank.id === selectedBank);

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
                                            <div className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold ${invoiceData.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {invoiceData.paymentStatus === 'paid' ? 'Lunas' : 'Menunggu Pembayaran'}
                                            </div>
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
                                                            {formatPrice(invoiceData.service_price)}/bulan
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
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
                                                    {formatPrice(invoiceData.totalPayment)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {invoiceData.paymentStatus !== 'paid' ? (
                                        <>
                                            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                                                <h3 className="text-lg font-semibold text-blue-800 mb-4">Metode Pembayaran</h3>
                                                
                                                <div className="mb-6">
                                                    <h4 className="font-medium text-gray-700 mb-3">Pilih Bank Tujuan:</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        {banks.map(bank => (
                                                            <div 
                                                                key={bank.id}
                                                                onClick={() => handleBankSelect(bank.id)}
                                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedBank === bank.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                            >
                                                                <div className="flex items-center">
                                                                    <img 
                                                                        src={bank.logo} 
                                                                        alt={bank.name} 
                                                                        className="h-8 mr-3 object-contain"
                                                                    />
                                                                    <span className="font-medium">{bank.name}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                                    <h4 className="font-medium text-gray-700 mb-3">Informasi Rekening:</h4>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Nama Bank</p>
                                                            <p className="font-medium">{selectedBankData.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Nomor Rekening</p>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">{selectedBankData.accountNumber}</p>
                                                                <button 
                                                                    onClick={() => copyToClipboard(selectedBankData.accountNumber, 'accountNumber')}
                                                                    className="text-teal-600 hover:text-teal-800"
                                                                >
                                                                    <FaCopy className="inline" />
                                                                    {copyStatus.accountNumber && <span className="ml-1 text-xs text-gray-500">Tersalin!</span>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Atas Nama</p>
                                                            <p className="font-medium">{selectedBankData.accountName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Jumlah Transfer</p>
                                                            <div className="flex items-center">
                                                                <p className="font-medium text-teal-600 mr-2">{formatPrice(invoiceData.totalPayment)}</p>
                                                                <button 
                                                                    onClick={() => copyToClipboard(invoiceData.totalPayment.toString(), 'amount')}
                                                                    className="text-teal-600 hover:text-teal-800"
                                                                >
                                                                    <FaCopy className="inline" />
                                                                    {copyStatus.amount && <span className="ml-1 text-xs text-gray-500">Tersalin!</span>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <h4 className="font-medium text-gray-700 mb-2">Instruksi Pembayaran:</h4>
                                                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 pl-2">
                                                        <li>Transfer tepat sejumlah <strong>{formatPrice(invoiceData.totalPayment)}</strong> ke rekening {selectedBankData.name} di atas</li>
                                                        <li>Simpan bukti transfer yang Anda lakukan</li>
                                                        <li>Setelah transfer, klik tombol "Konfirmasi Pembayaran" di bawah ini</li>
                                                        <li>Upload bukti transfer pada form konfirmasi</li>
                                                        <li>Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam</li>
                                                    </ol>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                                                <button 
                                                    onClick={() => setShowInvoice(false)}
                                                    className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                                                >
                                                    Kembali ke Form
                                                </button>
                                                <button 
                                                    onClick={confirmPayment}
                                                    className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
                                                >
                                                    Konfirmasi Pembayaran
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-lg font-medium text-green-800">Pembayaran Berhasil!</h3>
                                                    <div className="mt-2 text-sm text-green-700">
                                                        <p>
                                                            Pembayaran Anda telah kami terima pada {invoiceData.paymentDate}. 
                                                            Tim kami akan menghubungi Anda dalam 1x24 jam untuk proses instalasi.
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <a 
                                                            href="/" 
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                        >
                                                            Kembali ke Beranda
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                                        {formatPrice(selectedPackage.service_price)}/bulan
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