import React from 'react';
import { useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Swal from 'sweetalert2';

export default function Edit({ service }) {
    const { data, setData, put, errors, processing } = useForm({
        service_name: service.service_name || '',
        service_speed: service.service_speed || '',
        service_description: service.service_description || '',
        service_price: service.service_price || '',
        service_discount: service.service_discount || '',
        is_visible: service.is_visible !== undefined ? service.is_visible : true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirm Changes",
            text: "Are you sure you want to update this service?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                put(route('services.update', service.serv_id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Updated!",
                            text: "Service has been updated successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error updating the service.",
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">
                <div className="max-w-2xl mx-auto mt-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                            <h1 className="text-2xl font-bold">Edit Service</h1>
                            <p className="opacity-90">Update the service details below</p>
                        </div>
                        
                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Service Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="service_name">
                                        Service Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="service_name"
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                                            errors.service_name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={data.service_name}
                                        onChange={(e) => setData('service_name', e.target.value)}
                                        placeholder="e.g. Premium Internet"
                                        required
                                    />
                                    {errors.service_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service_name}</p>
                                    )}
                                </div>

                                {/* Service Speed */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="service_speed">
                                        Service Speed <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="service_speed"
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                                            errors.service_speed ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={data.service_speed}
                                        onChange={(e) => setData('service_speed', e.target.value)}
                                        placeholder="e.g. 100 Mbps"
                                        required
                                    />
                                    {errors.service_speed && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service_speed}</p>
                                    )}
                                </div>

                                {/* Service Price */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="service_price">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            id="service_price"
                                            className={`w-full pl-8 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                                                errors.service_price ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            value={data.service_price}
                                            onChange={(e) => setData('service_price', e.target.value)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    {errors.service_price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service_price}</p>
                                    )}
                                </div>

                                {/* Service Discount */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="service_discount">
                                        Discount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            %
                                        </span>
                                        <input
                                            type="number"
                                            id="service_discount"
                                            className={`w-full pl-8 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                                                errors.service_discount ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            value={data.service_discount}
                                            onChange={(e) => setData('service_discount', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    {errors.service_discount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service_discount}</p>
                                    )}
                                </div>
                            </div>

                            {/* Service Description */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="service_description">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="service_description"
                                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[120px] ${
                                        errors.service_description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    value={data.service_description}
                                    onChange={(e) => setData('service_description', e.target.value)}
                                    placeholder="Describe the service features and benefits..."
                                    required
                                />
                                {errors.service_description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.service_description}</p>
                                )}
                            </div>

                            {/* Visibility */}
                            <div className="flex items-center">
                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                    <input
                                        type="checkbox"
                                        id="is_visible"
                                        checked={data.is_visible}
                                        onChange={(e) => setData('is_visible', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <label
                                        htmlFor="is_visible"
                                        className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                                            data.is_visible ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                                                data.is_visible ? 'translate-x-4' : 'translate-x-0'
                                            }`}
                                        ></span>
                                    </label>
                                </div>
                                <label htmlFor="is_visible" className="text-gray-700 font-medium">
                                    Visible to customers
                                </label>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <a
                                    href={route('services.index')}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-6 py-2 rounded-lg text-white font-medium transition duration-200 ${
                                        processing
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}