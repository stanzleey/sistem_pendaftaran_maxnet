import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';

export default function Edit({ user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    // useEffect to set the form data when the user prop changes
    useEffect(() => {
        setName(user.name || '');
        setEmail(user.email || '');
    }, [user]); // Runs when the 'user' prop changes

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.put(route('users.update', user.id), {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }, {
            onSuccess: () => {
                // Clear all input fields on success
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Edit User</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user name"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user email"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user password"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Confirm user password"
                            />
                            {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
