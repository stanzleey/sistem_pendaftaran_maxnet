import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('users.store'), {
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
                setErrors({}); // Clear any existing errors

                // Show success notification
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: (errors) => {
                // Set errors to state for display
                setErrors(errors);

                // Show error notification
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There was an error creating the user!",
                    footer: `<ul>${Object.values(errors).map(err => `<li>${err}</li>`).join('')}</ul>`,
                });
            },
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create User</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user name"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email Field */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user email"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter user password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                className={`w-full p-2 border rounded transition duration-150 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Confirm user password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <PrimaryButton
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
