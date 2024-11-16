import { Link } from '@inertiajs/react';
import {
    FaTachometerAlt,
    FaSignal,
    FaMapMarkedAlt,
    FaUsers,
    FaEnvelope,
    FaUserCheck,
    FaBars,
    FaTimes,
    FaShieldAlt,
    FaGavel
} from 'react-icons/fa';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = window.location.pathname;                               

    return (
        <div>
            {/* Toggle Button for Mobile */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-2 text-gray-800 focus:outline-none absolute top-4 left-4 z-50"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen bg-gray-100 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                <div className="flex items-center justify-center p-4 border-b border-gray-300">
                    <img src="/img/maxnet.png" alt="Maxnet Logo" className="h-12" />
                </div>
                <nav className="mt-8">
                    <ul>
                        {[ 
                            { href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
                            { href: "/Admin/services", icon: <FaSignal />, label: "Services" },
                            { href: "/Admin/sites", icon: <FaMapMarkedAlt />, label: "Sites" },
                            { href: "/Admin/customers", icon: <FaUsers />, label: "Customers" },
                            { href: "/Admin/messages", icon: <FaEnvelope />, label: "Messages" },
                            { href: "/Admin/users", icon: <FaUserCheck />, label: "Users" },
                            { href: "/Admin/privacy-policy", icon: <FaShieldAlt />, label: "Privacy Policy" }, 
                            { href: "/Admin/terms-and-conditions", icon: <FaGavel />, label: "Terms and Conditions" }
                        ].map(({ href, icon, label }) => (
                            <li key={href}>
                                <Link 
                                    href={href} 
                                    className={`block px-4 py-3 text-gray-800 text-xl flex items-center transition duration-200 no-underline font-bold ${currentPath === href ? 'bg-blue-300' : 'hover:bg-gray-200'}`}
                                >
                                    {icon}
                                    <span className="ml-3">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
