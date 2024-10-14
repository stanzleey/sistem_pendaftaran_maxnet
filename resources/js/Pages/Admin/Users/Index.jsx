import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Sidebar from '@/Components/Sidebar';

export default function Index({ users }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle delete action
    const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/Admin/users/${userId}`, {
                    onSuccess: () => {
                        // Show success notification without an OK button
                        Swal.fire({
                            title: "Deleted!",
                            text: "The user has been deleted.",
                            icon: "success",
                            showConfirmButton: false, // Hide OK button
                            timer: 1500 // Optional: Auto close after 1.5 seconds
                        });
                    },
                });
            }
        });
    };

    return (
        <>
            <Head title="Admin - Users" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">User List</h1>
                        <Link href="/Admin/users/create" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Create New User
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 border-b text-left text-gray-600">ID</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Email</th>
                                    <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="py-3 px-4 border-b text-gray-700">{user.id}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{user.name}</td>
                                            <td className="py-3 px-4 border-b text-gray-700">{user.email}</td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex space-x-2">
                                                    {/* Edit button redirects to the user edit page */}
                                                    <Link
                                                        href={`/Admin/users/${user.id}/edit`}
                                                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    {/* Delete button sends a delete request */}
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
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
                                        <td colSpan="4" className="py-4 px-6 text-center text-gray-600">
                                            No users found.
                                        </td>
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
