import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import Swal from 'sweetalert2';

export default function Index({ customers, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMonthlyReport, setShowMonthlyReport] = useState(false);
    const [monthlyReports, setMonthlyReports] = useState([]);

    // Fungsi untuk membuat laporan bulanan
    const generateMonthlyReports = () => {
        const reports = {};
        
        customers.forEach(customer => {
            const date = new Date(customer.created_at);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
            
            if (!reports[monthYear]) {
                reports[monthYear] = {
                    month: monthName,
                    monthKey: monthYear,
                    totalCustomers: 0,
                    totalRevenue: 0,
                    services: {}
                };
            }
            
            reports[monthYear].totalCustomers += 1;
            const totalPrice = calculateTotalPrice(customer.service_price);
            reports[monthYear].totalRevenue += totalPrice;
            
            // Hitung per jenis layanan
            if (!reports[monthYear].services[customer.service_name]) {
                reports[monthYear].services[customer.service_name] = {
                    count: 0,
                    revenue: 0
                };
            }
            reports[monthYear].services[customer.service_name].count += 1;
            reports[monthYear].services[customer.service_name].revenue += totalPrice;
        });
        
        // Konversi ke array dan urutkan berdasarkan bulan (terbaru pertama)
        return Object.values(reports)
            .sort((a, b) => new Date(b.monthKey) - new Date(a.monthKey));
    };

    useEffect(() => {
        setMonthlyReports(generateMonthlyReports());
    }, [customers]);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatPrice = (price) => {
        return `Rp ${new Intl.NumberFormat('id-ID').format(price)}`;
    };

    const calculateTotalPrice = (servicePrice) => {
        const installationFee = 250000;
        return parseInt(servicePrice) + installationFee;
    };

    const handleDelete = async (customerId) => {
        // ... (kode handleDelete yang sudah ada)
    };

    useEffect(() => {
        if (flash?.message) {
            Swal.fire({
                title: "Notification",
                text: flash.message,
                icon: "info",
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Admin - Customers" />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-8 ml-64">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
                                <p className="text-gray-600 mt-2">Manage your customer accounts and information</p>
                            </div>
                            <div className="flex gap-4 mt-4 md:mt-0">
                                <button
                                    onClick={() => setShowMonthlyReport(true)}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Monthly Report
                                </button>
                                {/* <Link 
                                    href="/Admin/customers/create" 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add New Customer
                                </Link> */}
                            </div>
                        </div>

                        {/* Search and Stats Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="relative w-full md:w-96">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                    <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                        <p className="text-sm text-gray-600">Total Customers</p>
                                        <p className="text-xl font-semibold text-blue-600">{customers.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customers Table */}
                        {/* Customers Table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Paket</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCustomers.length > 0 ? (
                                            filteredCustomers.map((customer) => (
                                                <tr key={customer.id} className="hover:bg-gray-50 transition duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                                <div className="text-sm text-gray-500">ID: {customer.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            INV-{customer.id.toString().padStart(4, '0')}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(customer.created_at).toLocaleDateString('id-ID')}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{customer.phone_number}</div>
                                                        <div className="text-xs text-gray-500">{customer.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{customer.service_name}</div>
                                                        <div className="text-xs text-gray-500">{customer.service_speed} Mbps</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formatPrice(customer.service_price)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-teal-600">
                                                            {formatPrice(calculateTotalPrice(customer.service_price))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={`/Admin/customers/${customer.id}`}
                                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition duration-300 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                </svg>
                                                                View
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(customer.id)}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition duration-300 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center">
                                                    <div className="text-gray-500 py-8">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="mt-2 text-lg font-medium">No customers found</p>
                                                        <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Report Modal */}
                {showMonthlyReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Monthly Customer Reports</h2>
                                    <button
                                        onClick={() => setShowMonthlyReport(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {monthlyReports.length > 0 ? (
                                    <div className="space-y-6">
                                        {monthlyReports.map((report) => (
                                            <div key={report.monthKey} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                                                    <h3 className="text-lg font-semibold text-gray-800">{report.month}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        <div className="bg-blue-50 px-3 py-1 rounded-md">
                                                            <span className="text-sm text-gray-600">Customers: </span>
                                                            <span className="font-semibold text-blue-600">{report.totalCustomers}</span>
                                                        </div>
                                                        <div className="bg-green-50 px-3 py-1 rounded-md">
                                                            <span className="text-sm text-gray-600">Total Pendapatan: </span>
                                                            <span className="font-semibold text-green-600">{formatPrice(report.totalRevenue)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pendapatan</th>
                                                                {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {Object.entries(report.services).map(([service, data]) => (
                                                                <tr key={service}>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{service}</td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.count}</td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatPrice(data.revenue)}</td>
                                                                    {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                        {Math.round((data.count / report.totalCustomers) * 100)}%
                                                                    </td> */}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="mt-2 text-lg font-medium">No monthly reports available</p>
                                    </div>
                                )}

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setShowMonthlyReport(false)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg transition duration-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}