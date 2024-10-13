import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Authenticated({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header (Optional) */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>

            {/* Logout Button */}
          
        </div>
    );
}
