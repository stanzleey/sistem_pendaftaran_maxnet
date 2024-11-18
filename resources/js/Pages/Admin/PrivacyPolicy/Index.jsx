import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Sidebar";
import { Head } from "@inertiajs/react";

const IndexPage = ({ privacyPolicies, flash }) => {
    const [policies, setPolicies] = useState(privacyPolicies);

    useEffect(() => {
        if (flash && flash.newPolicy) {
            setPolicies((prevPolicies) => [flash.newPolicy, ...prevPolicies]);
        }
    }, [flash]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this policy?")) {
            Inertia.delete(`/privacy-policy/${id}`, {
                onSuccess: () => {
                    setPolicies((prevPolicies) =>
                        prevPolicies.filter((policy) => policy.id !== id)
                    );
                },
                onError: (error) => {
                    console.error("Failed to delete the policy:", error);
                    alert("Failed to delete the policy. Please try again.");
                },
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-white-100 items-center justify-start ml-40">
            <Sidebar />
            <div className="p-8 mx-auto w-full max-w-6xl rounded-lg">
                <Head title="Privacy Policies" />

                <div className="max-w-4xl mx-auto w-full">
                    {/* Title */}
                    <div className="mb-6 flex items-center justify-between flex-wrap">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Privacy Policies
                        </h1>
                        <Link
                            href="/Admin/privacy-policy/create"
                            className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Create New Policy
                        </Link>
                    </div>

                    {/* Policy List */}
                    <div className="space-y-4">
                        {policies.length > 0 ? (
                            policies.map((policy) => (
                                <div
                                    key={policy.id}
                                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {policy.title}
                                    </h2>
                                    <div
                                        className="mt-2 text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: policy.content,
                                        }}
                                    ></div>
                                    <div className="flex justify-end space-x-4 mt-4">
                                        {/* Edit Button */}
                                        <Link
                                            href={`privacy-policy/${policy.id}/edit`}
                                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition duration-300"
                                        >
                                            Edit
                                        </Link>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(policy.id)}
                                            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                No privacy policies available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
