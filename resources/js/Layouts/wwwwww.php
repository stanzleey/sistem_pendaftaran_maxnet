import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaHome, FaServicestack, FaPhoneAlt, FaSignInAlt, FaCommentAlt, FaMapMarkerAlt,
    FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaHistory,
    FaBusinessTime, FaHeadset, FaEnvelope, FaPhone, FaFacebook, FaGithub, 
    FaDribbble, FaWhatsapp, FaUserCircle, FaSignOutAlt, FaShoppingBag
} from 'react-icons/fa';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { auth } = usePage().props;
    const isCustomerLoggedIn = auth.customer;
    
    const isActive = (route) => url === route;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-2 flex justify-between items-center">
                    {/* Logo */}
                    <div className={`block ${isOpen ? 'hidden' : ''} lg:block`}>
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-10 w-auto lg:h-14"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex justify-end w-full absolute right-0 pr-6">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-blue-600 focus:outline-none flex items-center"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop and Tablet Menu */}
                    <div className="hidden lg:flex items-center space-x-4 ml-auto">
                        {['/home', '/locations', '/packages', '/contact'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`no-underline shrink-0 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-300 ${
                                    isActive(route) 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                                aria-current={isActive(route) ? 'page' : undefined}
                            >
                                <div className="flex items-center space-x-2">
                                    {route === '/home' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    )}
                                    {route === '/locations' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {route === '/packages' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {route === '/contact' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    )}
                                    
                                    <span>
                                        {route === '/home' ? 'Home' : 
                                         route === '/locations' ? 'Cek Lokasi' : 
                                         route === '/packages' ? 'Paket' : 
                                         'Hubungi Kami'}
                                    </span>
                                </div>
                            </Link>
                        ))}
                        
                        {/* Login Section - Desktop */}
                        <div className="flex items-center space-x-4">
                            {isCustomerLoggedIn ? (
                                <>
                                    {/* Button Histori Pemesanan */}
                                    <Link 
                                        href="/orders/history"
                                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        <FaShoppingBag />
                                        <span>Histori Pemesanan</span>
                                    </Link>
                                    
                                    {/* Profil dan Logout */}
                                    <div className="flex items-center space-x-2">
                                        <FaUserCircle className="text-blue-600 text-xl" />
                                        <span className="text-gray-700">{auth.customer.name}</span>
                                    </div>
                                    <Link 
                                        href={route('customer.logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </Link>
                                </>
                            ) : (
                                <Link 
                                    href={route('customer.login')}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <FaSignInAlt />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
 
                {/* Mobile Dropdown Menu */}
                <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Sidebar */}
                    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <img 
                                src="/img/maxnetlogo.png" 
                                alt="Maxnet Logo" 
                                className="h-10 w-auto"
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Sidebar Content */}
                        <div className="p-6">
                            <nav className="space-y-2">
                                {['/', '/locations', '/packages', '/contact'].map((route, index) => (
                                    <Link 
                                        key={index}
                                        href={route}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            isActive(route)
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {route === '/' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        )}
                                        {route === '/locations' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {route === '/packages' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {route === '/contact' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        )}
                                        
                                        <span className="font-medium">
                                            {route === '/' ? 'Home' : 
                                             route === '/locations' ? 'Cek Lokasi' : 
                                             route === '/packages' ? 'Paket' : 
                                             'Hubungi Kami'}
                                        </span>
                                    </Link>
                                ))}

                                {/* Menu untuk customer yang sudah login - Mobile */}
                                {isCustomerLoggedIn && (
                                    <>
                                        <Link 
                                            href="/orders/history"
                                            className="flex items-center px-4 py-3 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <FaShoppingBag className="mr-3" />
                                            <span className="font-medium">Histori Pemesanan</span>
                                        </Link>
                                        
                                        <div className="flex items-center px-4 py-3 text-gray-700">
                                            <FaUserCircle className="mr-3 text-blue-600" />
                                            <span>{auth.customer.name}</span>
                                        </div>
                                        
                                        <Link 
                                            href={route('customer.logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <FaSignOutAlt className="mr-3" />
                                            <span className="font-medium">Logout</span>
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-white-900 mt-20">
                {/* ... (footer content remains the same) ... */}
            </footer>
        </div>
    );
}