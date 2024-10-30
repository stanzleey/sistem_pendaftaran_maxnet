import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaHome, FaServicestack, FaPhoneAlt, FaSignInAlt, FaCommentAlt, FaMapMarkerAlt,
    FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp
} from 'react-icons/fa';

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
                    <div className="flex items-center space-x-3">
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
                    {/* Logo */}
                    <div className={`block ${isOpen ? 'hidden' : ''} md:block`}>
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-14 w-auto" // Increased size to h-14
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex justify-end w-full absolute right-0 pr-6">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-600 focus:outline-none flex items-center"
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
                                {/* Icons are vertically aligned using flex */}
                                <div className="flex items-center">
                                    {route === '/' && <FaHome className="mr-2 text-xl" />}
                                    {route === '/locations' && <FaServicestack className="mr-2 text-xl" />}
                                    {route === '/contact' && <FaPhoneAlt className="mr-2 text-xl" />}
                                    {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : 'Hubungi Kami'}
                                </div>
                            </Link>
                        ))}
                        <a 
                            href="https://customer.maxnetplus.id/login" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-purple-700 shadow-lg hover:shadow-xl text-lg flex items-center"
                            style={{ textDecoration: 'none' }}
                        >
                            <FaSignInAlt className="mr-2 text-xl" /> Customer Login
                        </a>
                    </div>
                </div>

                {/* Dropdown Menu for Mobile */}
                <div className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-start px-4 py-4 border-b">
                        <img 
                            src="/img/maxnetlogo.png" 
                            alt="Maxnet Logo" 
                            className="h-10 w-auto" // Increased size to h-10
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
                                    {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : 'Kontak'}
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
            <footer className="bg-slate-50 py-8">
              <div className="container mx-auto max-w-screen-lg px-4">

                  <div className="lg:flex lg:items-start lg:justify-between">
                      {/* Contact Info Section */}
                      <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left">
                          <img src="/img/maxnetlogo.png" alt="Maxnet Logo" className="h-16 w-auto mx-auto lg:mx-0" />
                          <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                              MaxNet Internet Service Provider (ISP) Terpercaya & Berkualitas.
                          </p>

                          <div className="mt-4 text-gray-700">
                              <p className="text-base font-semibold">Contact Us</p>
                              <p className="mt-1 text-base">
                                  <span className="font-medium">Phone: </span>
                                  <a href="tel:+622713406262" className="no-underline hover:text-teal-600">
                                      +62-271-340-6262
                                  </a>
                              </p>
                              <p className="mt-1 text-base">
                                  <span className="font-medium">Business Hours:</span>
                              </p>
                              <ul className="text-sm space-y-1 pl-2 lg:pl-4">
                                  <li>Monday to Friday: 08.00 - 17.00 WIB</li>
                                  <li>Saturday: 08.00 - 14.00 WIB</li>
                              </ul>
                              
                              {/* Social Media Icons Centered */}
                              <div className="mt-4 flex justify-center space-x-3">
                                  <a href="#" className="text-teal-600 hover:text-gray-500">
                                      <span className="sr-only">Facebook</span>
                                      <FaFacebookF className="w-5 h-5" />
                                  </a>
                                  <a href="#" className="text-teal-600 hover:text-gray-500">
                                      <span className="sr-only">Instagram</span>
                                      <FaInstagram className="w-5 h-5" />
                                  </a>
                                  <a href="https://wa.me/622713406262" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-gray-500">
                                      <span className="sr-only">Whatsapp</span>
                                      <FaWhatsapp className="w-5 h-5" />
                                  </a>
                              </div>
                          </div>
                      </div>

                      {/* Google Maps Embed Section */}
                      <div className="lg:w-1/2 mt-4 lg:mt-0">
                          <h3 className="text-base font-semibold text-gray-800 mb-2 text-center lg:text-left">Lokasi Kami</h3>
                          <div className="rounded-lg overflow-hidden shadow-md p-2 bg-white">
                              <iframe
                                  title="PT Lingkar Kabel Telekomunikasi Location"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2803077526454!2d110.765559!3d-7.5801076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15ecaee94319%3A0x59e2a27e5aebb1bf!2sKabel%20Telekom%20-%20PT.%20LINGKAR%20KABEL%20TELEKOMUNIKASI!5e0!3m2!1sen!2sid!4v1696338538232!5m2!1sen!2sid"
                                  width="100%"
                                  height="240"
                                  allowFullScreen=""
                                  loading="lazy"
                                  className="rounded-lg border"
                              ></iframe>
                          </div>
                      </div>
                    </div>
                  <p className="mt-8 text-center text-xs text-gray-500">
                      &copy; 2024 MaxNet. All rights reserved.
                  </p>
              </div>
          </footer>

        </div>
    );
}
