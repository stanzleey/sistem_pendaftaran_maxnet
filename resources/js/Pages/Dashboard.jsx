import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { FaServicestack, FaMapMarkerAlt, FaUsers, FaEnvelope, FaUser, FaSignOutAlt, FaBell, FaHistory, FaChartLine, FaCog } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';

export default function Dashboard({ auth, totalServices, totalSites, totalCustomers, totalMessages, totalUsers, recentActivities }) {
    const { post } = useForm();

    const handleLogout = (event) => {
        event.preventDefault();
        post('/logout', {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = '/';
            },
            onError: (errors) => {
                console.error('Logout failed:', errors);
            }
        });
    };

    // Format large numbers with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                            <p className="text-gray-600">Welcome back, <span className="font-medium text-blue-600">{auth.user.name}</span>!</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors">
                                <FaBell className="text-lg" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            
                            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors">
                                <FaCog className="text-lg" />
                            </button>
                            
                            <form onSubmit={handleLogout} className="inline">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 hover:text-red-600 transition-colors"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {/* Total Services Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Services</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(totalServices)}</h3>
            
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <FaServicestack className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Total Sites Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Sites</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(totalSites)}</h3>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Total Customers Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Customers</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(totalCustomers)}</h3>
                                   
                                </div>
                                <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                                    <FaUsers className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Total Messages Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Messages</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(totalMessages)}</h3>
                                   
                                </div>
                                <div className="p-3 bg-red-50 rounded-lg text-red-600">
                                    <FaEnvelope className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities Section (full width) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FiActivity className="text-blue-600" />
                                Recent Activities
                            </h2>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                                View All
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 group hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <div className={`mt-1 p-2 rounded-full ${index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                            <FaUser className="text-sm" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800">
                                                <span className="font-medium">{activity.user}</span> {activity.description}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No recent activities found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}