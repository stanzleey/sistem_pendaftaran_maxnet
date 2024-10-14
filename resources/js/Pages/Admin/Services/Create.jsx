import React from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Sidebar from '@/Components/Sidebar';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        service_name: '',
        service_speed: '',
        service_description: '',
        service_price: '',
        service_discount: '',
        is_visible: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Service has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
                    <h1 className="text-2xl font-semibold text-center mb-6">Create Service</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Service Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="service_name">
                                Service Name
                            </label>
                            <input
                                type="text"
                                id="service_name"
                                className={`w-full p-2 border rounded transition duration-150 ${errors.service_name ? 'border-red-500' : 'border-gray-300'}`}
                                value={data.service_name}
                                onChange={e => setData('service_name', e.target.value)}
                                placeholder="Enter service name"
                            />
                            {errors.service_name && <span className="text-red-500 text-sm">{errors.service_name}</span>}
                        </div>

                        {/* Service Speed */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="service_speed">
                                Service Speed
                            </label>
                            <input
                                type="text"
                                id="service_speed"
                                className={`w-full p-2 border rounded transition duration-150 ${errors.service_speed ? 'border-red-500' : 'border-gray-300'}`}
                                value={data.service_speed}
                                onChange={e => setData('service_speed', e.target.value)}
                                placeholder="Enter service speed"
                            />
                            {errors.service_speed && <span className="text-red-500 text-sm">{errors.service_speed}</span>}
                        </div>

                        {/* Service Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="service_price">
                                Service Price
                            </label>
                            <input
                                type="text"
                                id="service_price"
                                className={`w-full p-2 border rounded transition duration-150 ${errors.service_price ? 'border-red-500' : 'border-gray-300'}`}
                                value={data.service_price}
                                onChange={e => setData('service_price', e.target.value)}
                                placeholder="Enter service price"
                            />
                            {errors.service_price && <span className="text-red-500 text-sm">{errors.service_price}</span>}
                        </div>

                        {/* Service Discount */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="service_discount">
                                Service Discount
                            </label>
                            <input
                                type="text"
                                id="service_discount"
                                className={`w-full p-2 border rounded transition duration-150 ${errors.service_discount ? 'border-red-500' : 'border-gray-300'}`}
                                value={data.service_discount}
                                onChange={e => setData('service_discount', e.target.value)}
                                placeholder="Enter service discount"
                            />
                            {errors.service_discount && <span className="text-red-500 text-sm">{errors.service_discount}</span>}
                        </div>

                        {/* Service Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="service_description">
                                Service Description
                            </label>
                            <textarea
                                id="service_description"
                                className={`w-full p-2 border rounded transition duration-150 ${errors.service_description ? 'border-red-500' : 'border-gray-300'}`}
                                value={data.service_description}
                                onChange={e => setData('service_description', e.target.value)}
                                placeholder="Enter service description"
                                rows="4"
                            />
                            {errors.service_description && <span className="text-red-500 text-sm">{errors.service_description}</span>}
                        </div>

                        {/* Visibility */}
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="is_visible"
                                className="mr-2"
                                checked={data.is_visible}
                                onChange={e => setData('is_visible', e.target.checked)}
                            />
                            <label htmlFor="is_visible" className="text-gray-700 font-bold">
                                Visible
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                Create Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
