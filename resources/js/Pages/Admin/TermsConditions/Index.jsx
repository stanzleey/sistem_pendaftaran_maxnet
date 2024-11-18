import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Sidebar";
import { Head } from "@inertiajs/react";

const TermsIndexPage = ({ termsAndConditions, flash }) => {
    const [terms, setTerms] = useState(termsAndConditions);

    useEffect(() => {
        if (flash && flash.newTerm) {
            setTerms((prevTerms) => [flash.newTerm, ...prevTerms]);
        }
    }, [flash]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this term?")) {
            Inertia.delete(`/terms-and-conditions/${id}`, {
                onSuccess: () => {
                    setTerms((prevTerms) =>
                        prevTerms.filter((term) => term.id !== id)
                    );
                },
                onError: (error) => {
                    console.error("Failed to delete the term:", error);
                    alert("Failed to delete the term. Please try again.");
                },
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-white-100 items-center justify-start ml-60">
            <Sidebar />
            <div className="flex-1 p-8 bg-white shadow-xl rounded-lg mx-auto">
                <Head title="Terms and Conditions" />

                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Syarat & Ketentuan
                        </h1>
                        <Link
                            href="/Admin/terms-and-conditions/create"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Create New Term
                        </Link>
                    </div>

                    {/* Terms List */}
                    <div className="space-y-4">
                        {terms.length > 0 ? (
                            terms.map((term) => (
                                <div
                                    key={term.id}
                                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {term.title}
                                    </h2>
                                    <div
                                        className="mt-2 text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: term.content,
                                        }}
                                    ></div>
                                    <div className="flex justify-end space-x-4 mt-4">
                                        {/* Edit Button */}
                                        <Link
                                            href={`terms-and-conditions/${term.id}/edit`}
                                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition duration-300"
                                        >
                                            Edit
                                        </Link>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(term.id)}
                                            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                No terms and conditions available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsIndexPage;
