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
    FaGavel,
    FaChevronDown,
    FaChevronRight
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [expandedSection, setExpandedSection] = useState(null);

    // Group related menu items
    const menuSections = [
        {
            title: "Management",
            items: [
                { href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
                { href: "/Admin/services", icon: <FaSignal />, label: "Services" },
                { href: "/Admin/sites", icon: <FaMapMarkedAlt />, label: "Sites" },
                { href: "/Admin/customers", icon: <FaUsers />, label: "Customers" },
            ]
        },
        {
            title: "Communication",
            items: [
                { href: "/Admin/messages", icon: <FaEnvelope />, label: "Messages" },
                { href: "/Admin/users", icon: <FaUserCheck />, label: "Users" },
            ]
        },
        {
            title: "Legal",
            items: [
                { href: "/Admin/privacy-policy", icon: <FaShieldAlt />, label: "Privacy Policy" }, 
                { href: "/Admin/terms-and-conditions", icon: <FaGavel />, label: "Terms and Conditions" }
            ]
        }
    ];

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        
        // Auto-expand the section that contains the current path
        const currentSection = menuSections.find(section => 
            section.items.some(item => item.href === window.location.pathname)
        );
        if (currentSection) {
            setExpandedSection(currentSection.title);
        }
    }, []);

    // Close sidebar when clicking outside (for mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('aside') && !event.target.closest('button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleSection = (title) => {
        setExpandedSection(expandedSection === title ? null : title);
    };

    return (
        <div>
            {/* Toggle Button for Mobile */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-4 text-gray-800 focus:outline-none fixed top-4 left-4 z-50 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="flex items-center justify-center p-6 border-b border-gray-200">
                    <img 
                        src="/img/maxnet.png" 
                        alt="Maxnet Logo" 
                        className="h-10 object-contain" 
                    />
                </div>
                
                <nav className="mt-6 overflow-y-auto h-[calc(100vh-100px)]">
                    {menuSections.map((section) => (
                        <div key={section.title} className="mb-2">
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-semibold text-left"
                            >
                                <span>{section.title}</span>
                                {expandedSection === section.title ? (
                                    <FaChevronDown className="text-gray-500 text-xs" />
                                ) : (
                                    <FaChevronRight className="text-gray-500 text-xs" />
                                )}
                            </button>
                            
                            {expandedSection === section.title && (
                                <ul className="pl-2">
                                    {section.items.map(({ href, icon, label }) => (
                                        <li key={href}>
                                            <Link 
                                                href={href} 
                                                className={`block px-4 py-3 mx-2 rounded-md flex items-center transition duration-200 no-underline text-gray-700 ${
                                                    currentPath === href 
                                                        ? 'bg-blue-100 text-blue-700 font-medium' 
                                                        : 'hover:bg-gray-100'
                                                }`}
                                                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                                            >
                                                <span className="text-blue-500 mr-3">{icon}</span>
                                                <span>{label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
                
                {/* Sidebar footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
                    Maxnet Admin Panel v1.0
                </div>
            </aside>
            
            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
            )}
        </div>
    );
}