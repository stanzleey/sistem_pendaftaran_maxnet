import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importing the FaBars icon
import Sidebar from '@/Components/Sidebar';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} /> {/* Pass the state to Sidebar */}

            {/* Main Content */}
            <div className="flex-1 p-4 md:ml-64">
                {/* Mobile Header */}
                

                {children}
            </div>
        </div>
    );
}
