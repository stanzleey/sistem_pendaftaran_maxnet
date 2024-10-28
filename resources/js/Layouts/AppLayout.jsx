import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaHome, FaServicestack, FaPhoneAlt, FaSignInAlt, FaCommentAlt, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (route) => url === route;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Contact Section */}
            <div className="bg-white text-black px-5 hidden lg:block shadow-md">
            <div className="container mx-auto flex justify-between items-center py-2">
                    <div className="flex items-center space-x-6">
                        <small className="flex items-center text-sm hover:text-indigo-600 transition-colors duration-300">
                            <FaPhoneAlt className="mr-2 text-indigo-600" />
                            <a href="tel:+622713406262" className="no-underline">+62-271-340-6262</a>
                        </small>
                        <small className="flex items-center text-sm hover:text-indigo-600 transition-colors duration-300">
                            <FaCommentAlt className="mr-2 text-indigo-600" />
                            <a href="mailto:info@maxnetplus.id" className="no-underline">info@maxnetplus.id</a>
                        </small>
                    </div>
                    <div className="flex space-x-4">
                        {[FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, index) => (
                            <a key={index} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300" href="#" target="_blank" rel="noreferrer">
                                <Icon className="w-6 h-6 transition-transform transform hover:scale-110" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
          {/* Navbar */}
          <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-2 flex justify-between items-center">
                    {/* Logo - Only Visible in Desktop and when Mobile Menu is Closed */}
                    <div className={`block ${isOpen ? 'hidden' : ''} md:block`}>
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-16 w-auto" 
                        />
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex justify-end w-full absolute right-0 pr-6">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-600 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 ml-auto">
                        {['/', '/locations', '/contact'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`shrink-0 rounded-lg p-2 text-lg font-medium transition-colors duration-300 ${isActive(route) ? 'bg-purple-600 bg-opacity-20 text-purple-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                                aria-current={isActive(route) ? 'page' : undefined}
                                style={{ textDecoration: 'none' }}
                            >
                                {route === '/' && <FaHome className="inline mr-2 text-xl" />}
                                {route === '/locations' && <FaServicestack className="inline mr-2 text-xl" />}
                                {route === '/contact' && <FaPhoneAlt className="inline mr-2 text-xl" />}
                                {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : 'Hubungi Kami'}
                            </Link>
                        ))}
                        <Link 
                            href="/login" 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-purple-700 shadow-lg hover:shadow-xl text-lg flex items-center"
                            style={{ textDecoration: 'none' }}
                        >
                            <FaSignInAlt className="inline mr-2 text-xl" /> Customer Login
                        </Link>
                    </div>
                </div>
                {/* Dropdown Menu Mobile */}
                <div className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Logo in Mobile Menu */}
                    <div className="flex items-center justify-start px-4 py-4 border-b">
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-10 w-auto"
                        />
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    {/* Menu Items */}
                    <div className="flex flex-col items-start py-4 space-y-2 px-4 mt-12">
                        {['/', '/locations', '/contact'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`w-full text-left py-3 text-lg text-gray-800 hover:bg-purple-100 rounded-lg transition-colors duration-300 ${isActive(route) ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}
                                onClick={() => setIsOpen(false)}
                                style={{ textDecoration: 'none' }}
                            >
                                {route === '/' && <FaHome className="inline mr-2 text-xl" />}
                                {route === '/locations' && <FaServicestack className="inline mr-2 text-xl" />}
                                {route === '/contact' && <FaPhoneAlt className="inline mr-2 text-xl" />}
                                {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : 'Kontak'}
                            </Link>
                        ))}

                        {/* Customer Login Button */}
                        <Link 
                            href="/login" 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-purple-700 shadow-lg hover:shadow-xl text-lg flex items-center"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsOpen(false)} // Optional: close the menu when clicked
                        >
                            <FaSignInAlt className="inline mr-2 text-xl" /> Customer Login
                        </Link>
                    </div>
                    {/* Footer Section */}
                    <div className="border-t mt-4 px-4 py-4 text-center text-sm text-gray-600">
                        <p>&copy; 2024 Maxnet. All rights reserved.</p>
                        <div className="flex justify-center mt-2 space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/622713406262" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaWhatsapp />
                            </a>
                        </div>
                        <p className="mt-2">+62-271-340-6262</p>
                        <p>Monday to Friday: 08.00 - 17.00 WIB</p>
                        <p>Saturday: 08.00 - 14.00 WIB</p>
                    </div>
                </div>
            </nav>
            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-slate-800 lg:grid lg:grid-cols-5">
                {/* Google Map Section */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:col-span-2 lg:h-full">
                    <iframe
                        title="Kabel Telekom - PT. Lingkar Kabel Telekomunikasi"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2803077526454!2d110.765559!3d-7.5801076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15ecaee94319%3A0x59e2a27e5aebb1bf!2sKabel%20Telekom%20-%20PT.%20LINGKAR%20KABEL%20TELEKOMUNIKASI!5e0!3m2!1sen!2sid!4v1696338538232!5m2!1sen!2sid"
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                
                {/* Contact Info Section */}
                <div className="px-4 py-8 sm:px-6 lg:col-span-3 lg:px-8">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        {/* Logo for Mobile */}
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-16 mb-3 block md:hidden" // Smaller logo for mobile
                        />

                        {/* Logo for Desktop */}
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="hidden h-28 mb-3 lg:h-22 md:block" // Larger logo for desktop
                        />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white">Contact us</p>
                            <a
                                href="tel:+622713406262"
                                className="mt-1 block text-2xl font-semibold text-white hover:text-gray-300"
                                style={{ textDecoration: 'none' }}
                            >
                                +62-271-340-6262
                            </a>
                            <ul className="mt-2 space-y-1 text-sm text-gray-300">
                                <li>Monday to Friday: 08.00 - 17.00 WIB</li>
                                <li>Saturday: 08.00 - 14.00 WIB</li>
                            </ul>
                        </div>
                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-white hover:text-gray-300 flex items-center"
                                style={{ textDecoration: 'none' }}
                            >
                                <span className="sr-only">Facebook</span>
                                <FaFacebookF className="w-5 h-5 mr-1" />
                            </a>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-white hover:text-gray-300 flex items-center"
                                style={{ textDecoration: 'none' }}
                            >
                                <span className="sr-only">Instagram</span>
                                <FaInstagram className="w-5 h-5 mr-1" />
                            </a>
                            <a
                                href="https://wa.me/622713406262"
                                rel="noreferrer"
                                target="_blank"
                                className="text-white hover:text-gray-300 flex items-center"
                                style={{ textDecoration: 'none' }}
                            >
                                <span className="sr-only">Whatsapp</span>
                                <FaWhatsapp className="w-5 h-5 mr-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}