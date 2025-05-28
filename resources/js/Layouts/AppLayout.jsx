import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaHome, FaServicestack, FaPhoneAlt, FaSignInAlt, FaCommentAlt, FaMapMarkerAlt,
    FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube,  FaHistory,
    FaBusinessTime,
    FaHeadset,
    FaEnvelope,
    FaPhone,
    FaFacebook,
    FaGithub,
    FaDribbble,
    FaWhatsapp,
} from 'react-icons/fa';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

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
                            className="h-10 w-auto lg:h-14" // Responsive logo size
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex justify-end w-full absolute right-0 pr-6">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-600 focus:outline-none flex items-center"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop and Tablet Menu */}
                    <div className="hidden lg:flex items-center space-x-4 ml-auto">
                        {/* <div className={`no-underline shrink-0 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-300 ${
                                    isActive(route) 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                }`}>    
                                <div className="flex items-center space-x-2">
                                    <a href="/">Home</a>
                                    <a href="/packages">Paket</a>
                                    <a href="/locations">Cek Lokasi</a>
                                    <a href="/contact">Hubungi Kami </a>
                                </div>
                                
                        </div> */}
                         
                        {['/', '/locations', '/packages','/contact'].map((route, index) => (
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
                                    {route === '/' && (
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
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    )} 
                                    {route === '/contact' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    )}
                                  
                                    <span>
                                        {route === '/' ? 'Home' : route === '/locations' ? 'Cek Lokasi' : 'Hubungi Kami'}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                </div>
 
                {/* Mobile Dropdown Menu */}
                <div className={`lg:hidden fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-start px-4 py-4 border-b">
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-10 w-auto"
                        />
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="flex flex-col items-start py-4 space-y-2 px-4 mt-12">
                        {['/', '/locations', '/contact'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`w-full text-left py-3 text-lg text-gray-800 hover:bg-purple-100 rounded-lg transition-colors duration-300 ${isActive(route) ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}
                                onClick={() => setIsOpen(false)}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="flex items-center">
                                    {route === '/' && <FaHome className="mr-2 text-xl" />}
                                    {route === '/locations' && <FaServicestack className="mr-2 text-xl" />}
                                    {route === '/contact' && <FaPhoneAlt className="mr-2 text-xl" />}
                                    {route === '/' ? 'Home' : route === '/locations' ? 'Cek Lokasi' : 'Kontak'}
                                </div>
                            </Link>
                        ))}
                        <a 
                            href="https://customer.maxnetplus.id/login" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-purple-700 shadow-lg hover:shadow-xl text-lg flex items-center"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsOpen(false)}
                        >
                            <FaSignInAlt className="mr-2 text-xl" /> Customer Login
                        </a>
                    </div>
                </div>
            </nav>
            {/* Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-white-900  mt-20">
                <div className="container mx-auto max-w-screen-lg px-4 lg:px-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 text-center lg:text-left">

                        {/* Logo Section */}
                        <div className="flex flex-col items-center lg:items-start mb-12 lg:mb-0 text-center lg:ml-[-1rem]">
                            <img src="/img/MAXNETout.png" alt="Maxnet Logo" className="h-24 w-auto mb-8" />
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md mt-4">
                                MaxNet Internet Service Provider Terpercaya & Berkualitas.
                            </p>
                        </div>

                        {/* About Us Section */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0 lg:ml-[-2rem]">
                            <h3 className="text-blue-400 font-semibold mb-1 text-lg px-4">PERUSAHAAN</h3>
                            <ul className="space-y-3 pl-4 lg:pl-0">
                                <li>
                                    <a href="/tentang" className="px-4 text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                         Tentang Kami
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms-and-conditions" className="px-4 text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                         Syarat dan Ketentuan
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy-policy" className="px-4 text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                       Kebijakan Privasi
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services Section */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0 lg:ml-[-2rem]">
                            <h3 className="text-blue-400 font-semibold mb-1 text-lg ">PAKET</h3>
                            <ul className="space-y-3 pl-4 lg:pl-0">
                                <li>
                                    <a href="#" className="text-lg text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                    Internet Business 
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                    Home Internet
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline">
                                        Internet Gaming
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us Section */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-1 lg:ml-[-2rem]">
                            <h3 className="text-lg text-blue-400 font-semibold mb-1">BANTUAN DAN PANDUAN</h3>
                            <ul className="space-y-3 pl-4 lg:pl-0">
                                <li>
                                    <a href="mailto:info@maxnetplus.id" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline text-lg">
                                    <FaEnvelope size={20} />  info@maxnetplus.id
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://wa.me/628991066262" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 no-underline" 
                                    >
                                        <FaWhatsapp size={20} /> +62-899-106-6262
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Map Section */}
                        {/* <div className="flex flex-col items-center lg:items-end mt-10 lg:mt-0 text-center lg:ml-[-1rem]">
                            <div className="rounded-lg overflow-hidden shadow-md p-1 bg-slate-800 w-full lg:w-[300px]">
                                <iframe
                                    title="PT Lingkar Kabel Telekomunikasi Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2803077526454!2d110.765559!3d-7.5801076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15ecaee94319%3A0x59e2a27e5aebb1bf!2sKabel%20Telekom%20-%20PT.%20LINGKAR%20KABEL%20TELEKOMUNIKASI!5e0!3m2!1sen!2sid!4v1696338538232!5m2!1sen!2sid"
                                    width="100%"
                                    height="200"
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="rounded-lg border"
                                ></iframe>
                            </div>
                        </div> */}
                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-10 text-center">
                        <div className="flex justify-center space-x-4 mb-3">
                            <a href="#" className="text-teal-500 hover:text-teal-400 no-underline"><FaFacebook /></a>
                            <a href="#" className="text-teal-500 hover:text-teal-400 no-underline"><FaInstagram /></a>
                            <a href="#" className="text-teal-500 hover:text-teal-400 no-underline"><FaTwitter /></a>
                            <a href="#" className="text-teal-500 hover:text-teal-400 no-underline"><FaGithub /></a>
                            <a href="#" className="text-teal-500 hover:text-teal-400 no-underline"><FaDribbble /></a>
                        </div>
                        <p className="text-sm text-slate-500">
                            &copy; 2024 MaxNet. All rights reserved. 
                            {/* <a href="/terms-and-conditions" className="text-teal-500 hover:text-teal-400 no-underline"> Syarat & Ketentuan </a> 
                            · 
                            <a href="/privacy-policy" className="text-teal-500 hover:text-teal-400 no-underline"> Kebijakan Privasi </a> */}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
