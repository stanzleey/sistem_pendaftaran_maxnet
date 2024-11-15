import React, { useEffect, useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";

const PrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState("");
    const [error, setError] = useState(null); // Define the error state

    useEffect(() => {
        // Fetch the privacy policy content from the API
        axios.get('/privacy-policy/content')
            .then(response => {
                setPrivacyPolicy(response.data.content || 'Privacy policy not available.');
            })
            .catch(() => {
                setError('Privacy policy not available.');
            });
    }, []);

    const goBack = () => {
        Inertia.visit("/"); // Change path if needed
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
                <div className="max-w-4xl mx-auto py-12 px-6 md:px-10">
                    <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-lg mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
                        {error ? (
                            <p className="text-red-600 font-semibold">{error}</p>
                        ) : privacyPolicy ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: privacyPolicy }}
                            />
                        ) : (
                            <p className="animate-pulse text-gray-500">
                                Loading privacy policy...
                            </p>
                        )}
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={goBack}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PrivacyPolicy;
