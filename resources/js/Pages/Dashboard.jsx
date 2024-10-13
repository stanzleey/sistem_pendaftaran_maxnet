import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { FaServicestack, FaMapMarkerAlt, FaUsers, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Dashboard({ auth, totalServices, totalSites, totalCustomers, totalMessages, totalUsers, recentActivities }) {
    // Setup form for logout
    const { post } = useForm();

    // Logout handler
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

    return (
        <>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-4">Welcome, {auth.user.name}!</span>
                            {/* Button Logout */}
                            <form onSubmit={handleLogout} className="inline">
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> {/* Logout icon */}
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4">You're logged in!</p>

                    {/* Total Data Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center">
                            <FaServicestack className="text-3xl mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Services</h3>
                                <p className="text-2xl">{totalServices}</p>
                            </div>
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center">
                            <FaMapMarkerAlt className="text-3xl mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Sites</h3>
                                <p className="text-2xl">{totalSites}</p>
                            </div>
                        </div>
                        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center">
                            <FaUsers className="text-3xl mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Customers</h3>
                                <p className="text-2xl">{totalCustomers}</p>
                            </div>
                        </div>
                        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md flex items-center">
                            <FaEnvelope className="text-3xl mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Messages</h3>
                                <p className="text-2xl">{totalMessages}</p>
                            </div>
                        </div>
                        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex items-center">
                            <FaUser className="text-3xl mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">Total Users</h3>
                                <p className="text-2xl">{totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities Section */}
                    <section className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                        <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <li key={index} className="border-b last:border-b-0 py-2">
                                        <strong>{activity.user}</strong>: {activity.description} 
                                        <span className="text-gray-500 text-sm"> ({activity.timestamp})</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-600">No recent activities found.</li>
                            )}
                        </ul>
                    </section>
                </div>
            </DashboardLayout>
        </>
    );
}
