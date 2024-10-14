import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Index({ sites }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter sites based on search term
    const filteredSites = sites.filter(site =>
        site.site_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle successful actions (create/edit/delete)
    const handleSuccess = (action) => {
        let message;
        let details;

        switch (action) {
            case 'created':
                message = 'Site created successfully!';
                details = 'The new site has been added.';
                break;
            case 'edited':
                message = 'Site edited successfully!';
                details = 'Your changes have been saved.';
                break;
            case 'deleted':
                message = 'Site deleted successfully!';
                details = 'The site has been removed.';
                break;
            default:
                message = 'Success!';
                details = 'The action was successful.';
        }

        toast(
            <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex items-start gap-4">
                    <span className="text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>

                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">{message}</strong>
                        <p className="mt-1 text-sm text-gray-700">{details}</p>
                    </div>

                    <button className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>,
            {
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
        );
    };

    // Function to confirm and handle deletion
    const handleDelete = (siteId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/Admin/sites/${siteId}`, {
                    onSuccess: () => {
                        handleSuccess('deleted');
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        toast.error('Failed to delete site!', {
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
            }
        });
    };

    const handleEdit = (siteId) => {
        Inertia.get(`/Admin/sites/${siteId}/edit`, {
            onSuccess: () => handleSuccess('edited'),
            onError: () => {
                toast.error('Failed to edit site!', {
                    style: {
                        background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
            }
        });
    };

    return (
        <>
            <Head title="Admin - Sites" />
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop closeOnClick draggable pauseOnHover />
            
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Site List</h1>
                        <Link 
                            href="/Admin/sites/create" 
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Create New Site
                        </Link>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by site name..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Site ID</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Site Name</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Site Parent</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Description</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Type ID</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Location Maps</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Address</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Port Capacity</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Site Picture</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSites.length > 0 ? (
                                    filteredSites.map((site) => (
                                        <tr key={site.site_id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_id}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_name}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_parent}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_description}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_type_id}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_location_maps}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_address}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{site.site_port_capacity}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">
                                                {site.site_picture ? (
                                                    <img
                                                        src={`/uploads/${site.site_picture}`}
                                                        alt="Site"
                                                        className="w-16 h-16 rounded-full"
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => handleEdit(site.site_id)} 
                                                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-300"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(site.site_id)} 
                                                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="py-3 px-4 text-center text-gray-700">No sites found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
