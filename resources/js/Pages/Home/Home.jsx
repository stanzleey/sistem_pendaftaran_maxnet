import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Title from '@/Layouts/Title';
import { FaDollarSign, FaBolt, FaInfoCircle, FaWifi, FaClock, FaShieldAlt } from 'react-icons/fa';

export default function Home() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <AppLayout>
             <Title /> 
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white">
                {/* Background Video */}
                <div className="absolute inset-0 overflow-hidden">
                <img
                                    alt="Maxnet team at work"
                                    src="/img/bg 1.jpg"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                </div>
                {/* Content */}
                <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:py-32 lg:py-32 lg:flex lg:h-screen lg:items-center">
                    <div className=" max-w-3xl ">
                        {/* Title */}
                        <h1 className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-4xl font text-white sm:text-6xl lg:text-7xl font-archivo animate-slide-in leading-tight">
                        Beri Koneksi Internet 
                        </h1>
                        <h2 className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-4xl font text-white sm:text-6xl lg:text-7xl font-archivo animate-slide-in leading-tight">
                        Lebih Cepat
                        </h2>
                        {/* Subtitle */}
                        <h2 className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-4xl font text-white sm:text-3xl lg:text-2xl font-archivo animate-slide-in leading-tight">
                        #pakaimaxnet
                        </h2>
                        <p className=" mt-4 max-w-md sm:max-w-xl text-base sm:text-lg lg:text-xl text-gray-300 font-archivo animate-fade-in">
                            Nikmati pengalaman Internetan tanpa hambatan, dengan layanan internet yang dirancang untuk rumah dan bisnis Anda.
                        </p>
                        {/* Button */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="flex items-center justify-center bg-white py-6 sm:py-12">
                <div className="text-center max-w-md sm:max-w-2xl animate-fade-in px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 flex items-center justify-center">
                        <span className="mr-1 sm:mr-2 text-3xl sm:text-4xl">
                            <i className="fas fa-wifi"></i>
                        </span>
                        Internetan Lancar Mulai dari 100 Ribuan
                    </h2>
                </div>
            </div>
            {/* Advertising Section */}
            <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900" data-aos="fade-up">
    <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                    LAYANAN INTERNET KAMI
                </span>
            </h2>
            <p className="text-center text-blue-100 mb-8 text-base md:text-lg max-w-3xl mx-auto">
                Tersedia pilihan paket internet berkecepatan tinggi dengan biaya terjangkau. 
                Jelajahi dunia digital tanpa hambatan bersama layanan kami.
            </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="group relative block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/90 z-10"></div>
                <img
                    alt="15 Mbps Merdeka"
                    src="/img/internet 2.jpg"
                    className="h-48 w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="relative z-20 p-6 bg-slate-800/70 backdrop-blur-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Paket Home Internet</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">15 MBPS MERDEKA</h3>
                    <div className="mt-4 flex items-center">
                        <span className="text-2xl font-bold text-blue-400">Rp 150.000</span>
                        <span className="ml-2 text-blue-200">/bulan</span>
                    </div>
                    <div className="mt-6">
                        {/* <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-1">
                            Pilih Paket
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group relative block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-slate-900/90 z-10"></div>
                <img
                    alt="60 Mbps Merdeka"
                    src="/img/internet 3.jpg"
                    className="h-48 w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="relative z-20 p-6 bg-slate-800/70 backdrop-blur-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Paket Internet</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">60 MBPS MERDEKA</h3>
                    <div className="mt-4 flex items-center">
                        <span className="text-2xl font-bold text-indigo-400">Rp 250.000</span>
                        <span className="ml-2 text-indigo-200">/bulan</span>
                    </div>
                    {/* <div className="mt-6">
                        <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-1">
                            Pilih Paket
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Card 3 */}
            <div className="group relative block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-slate-900/90 z-10"></div>
                <img
                    alt="120 Mbps Premium"
                    src="/img/tv 1.jpg"
                    className="h-48 w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="relative z-20 p-6 bg-slate-800/70 backdrop-blur-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">TV Channel langganan</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">MNCTV 48 Channel</h3>
                    <div className="mt-4 flex items-center">
                        <span className="text-2xl font-bold text-purple-400">Rp 100.000</span>
                        <span className="ml-2 text-purple-200">/bulan</span>
                    </div>
                    {/* <div className="mt-6">
                        <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-1">
                            Pilih Paket
                        </button>
                    </div> */}
                </div>
            </div>
        </div>

        <div className="mt-16 text-center space-y-4">
            <a
                href="/locations"
                className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 text-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
                Daftar Berlangganan Sekarang
                <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <div>
                <a
                    href="/locations"
                    className="inline-block text-blue-300 hover:text-white transition-colors duration-300"
                >
                    Lihat semua paket lainnya →
                </a>
            </div>
        </div>
    </div>
</section>
            {/* Solusi Internet Section */}
            <section className="py-16 bg-gray-50 relative" data-aos="fade-up">
            <div className="max-w-7xl mx-auto mt-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                        Keunggulan Layanan Maxnet
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-purple-100 p-4 rounded-full">
                                    <FaBolt className="text-purple-600 text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Kecepatan Tinggi</h3>
                            <p className="text-gray-600">Internet super cepat dengan bandwidth dedicated untuk pengalaman tanpa buffering</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <FaClock className="text-blue-600 text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Stabil 24/7</h3>
                            <p className="text-gray-600">Layanan uptime 99.9% dengan jaringan fiber optic yang stabil</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <FaShieldAlt className="text-green-600 text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Aman & Terjamin</h3>
                            <p className="text-gray-600">Dilengkapi firewall dan proteksi untuk keamanan data Anda</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section: Cara Berlangganan */}
            <section className="py-20 text-center relative bg-gradient-to-b from-gray-50 to-white" data-aos="fade-up">
    <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
    </div>
    <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Cara Berlangganan di Maxnet</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Hanya tiga langkah sederhana untuk menikmati layanan internet berkualitas tinggi dari kami</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1: Registrasi */}
            <div className="relative block overflow-hidden bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group" data-aos="fade-up">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-5 bg-blue-100 rounded-full transition-all duration-300 group-hover:bg-blue-200">
                            <i className="fas fa-user-plus text-4xl text-blue-600"></i>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Registrasi</h3>
                    <p className="text-gray-600">Lengkapi formulir pendaftaran online dan pilih paket layanan yang sesuai kebutuhan Anda.</p>
                </div>
            </div>

            {/* Step 2: Verifikasi */}
            <div className="relative block overflow-hidden bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-5 bg-purple-100 rounded-full transition-all duration-300 group-hover:bg-purple-200">
                            <i className="fas fa-check-circle text-4xl text-purple-600"></i>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Verifikasi</h3>
                    <p className="text-gray-600">Tim kami akan memverifikasi data Anda dalam 1x24 jam untuk mengaktifkan layanan.</p>
                </div>
            </div>

            {/* Step 3: Aktivasi */}
            <div className="relative block overflow-hidden bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group" data-aos="fade-up" data-aos-delay="200">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-5 bg-indigo-100 rounded-full transition-all duration-300 group-hover:bg-indigo-200">
                            <i className="fas fa-wifi text-4xl text-indigo-600"></i>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Aktivasi</h3>
                    <p className="text-gray-600">Nikmati internet super cepat segera setelah layanan Anda aktif dan terpasang.</p>
                </div>
            </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="300">
            <a href="/locations">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700">
                Daftar Sekarang
                <i className="fas fa-arrow-right ml-2"></i>
            </button>
            </a>
        
        </div>

        {/* Mobile Styling */}
        <style>{`
            @media (max-width: 768px) {
                h2 {
                    font-size: 2rem;
                    line-height: 2.5rem;
                }
                
                .grid {
                    gap: 1.5rem;
                }
                
                .relative.block {
                    padding: 1.5rem;
                }
            }
        `}</style>
    </div>
</section>
        </AppLayout>      
    );
}