import React, { useEffect, useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";

const TermsAndConditions = () => {
    const [termsAndConditions, setTermsAndConditions] = useState("");
    const [error, setError] = useState(null); // Define the error state

    useEffect(() => {
        // Fetch the terms and conditions content from the API
        axios.get('/terms-and-conditions/content')
            .then(response => {
                setTermsAndConditions(response.data.content || 'Terms and conditions not available.');
            })
            .catch(() => {
                setError('Terms and conditions not available.');
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
                        Syarat & Ketentuan
                    </h1>

                    <div className="prose prose-lg mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
                        {error ? (
                            <p className="text-red-600 font-semibold">{error}</p>
                        ) : termsAndConditions ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
                            />
                        ) : (
                            <p className="animate-pulse text-gray-500">
                                Loading terms and conditions...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default TermsAndConditions;
