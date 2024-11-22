import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Title from '@/Layouts/Title';

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
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
                    >
                        <source src="/img/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                {/* Content */}
                <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:py-32 lg:py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Title */}
                        <h1 className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl font-archivo animate-slide-in leading-tight">
                            Internet Cepat Hemat
                        </h1>
                        <h2 className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl font-archivo animate-slide-in leading-tight">
                            Anti Lemot
                        </h2>
                        {/* Subtitle */}
                        <p className="mx-auto mt-4 max-w-md sm:max-w-xl text-base sm:text-lg lg:text-xl text-gray-300 font-archivo animate-fade-in">
                            Nikmati pengalaman Internetan tanpa hambatan, dengan layanan internet yang dirancang untuk rumah dan bisnis Anda.
                        </p>
                        {/* Button */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/locations"
                                className="block w-full sm:w-auto rounded bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-3 text-sm font-medium text-white transition-transform transform hover:scale-105 focus:outline-none focus:ring active:bg-blue-800 font-archivo no-underline shadow-lg hover:shadow-xl"
                            >
                                Lihat Layanan Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Section - Solusi Internet Terbaik */}
            <section className="relative overflow-hidden bg-white">
                <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen gap-8">
                        
                        {/* Image Section */}
                        <div className="relative z-10">
                            <div className="relative h-48 sm:h-80 lg:h-full rounded-xl overflow-hidden">
                                <img
                                    alt="Maxnet team at work"
                                    src="/img/gambar8.jpeg"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="relative flex items-center bg-white rounded-lg shadow-lg lg:shadow-none">
                            <span className="hidden lg:block lg:absolute lg:inset-y-0 lg:-start-16 lg:w-16 lg:bg-white"></span>
                            
                            <div className="p-6 sm:p-12 lg:p-24">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                    Tentang Maxnet
                                </h2>
                                
                                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                                    Maxnet adalah penyedia layanan internet terdepan yang berkomitmen untuk menghubungkan setiap orang dengan dunia digital. Dengan inovasi tanpa henti dan infrastruktur yang solid, kami memastikan Anda mendapatkan pengalaman online yang cepat, aman, dan terpercaya.
                                </p>

                                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                                    Kami percaya bahwa internet adalah jendela dunia, dan kami berdedikasi untuk memberikan akses yang lebih baik kepada masyarakat. Dari individu hingga perusahaan, Maxnet siap memenuhi berbagai kebutuhan internet Anda dengan layanan yang dirancang khusus untuk memberikan kepuasan maksimal.
                                </p>

                                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                                    Dengan tim ahli yang selalu siap sedia, kami mengutamakan dukungan pelanggan yang luar biasa. Di Maxnet, kepuasan Anda adalah prioritas utama kami, dan kami berkomitmen untuk terus berinovasi demi memberikan yang terbaik bagi Anda.
                                </p>

                                {/* Button */}
                                <Link
                                    href="/contact"
                                    className="mt-6 sm:mt-8 inline-block rounded border border-indigo-600 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-2 sm:px-10 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 no-underline"
                                >
                                    Hubungi Kami
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            <section className="py-16 bg-slate-700" data-aos="fade-up">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white flex items-center justify-center">
                        <span className="mr-3 text-5xl md:text-6xl text-indigo-500">
                            <i className="fas fa-bolt"></i>
                        </span>
                        Pilihan Paket Internet Terbaik untuk Anda
                        <span className="ml-3 text-5xl md:text-6xl text-indigo-500">
                            <i className="fas fa-bolt"></i>
                        </span>
                    </h2>
                    <p className="text-center text-gray-300 mb-8 text-base md:text-lg">
                        Berbagai pilihan paket internet dengan kecepatan tinggi dan harga terjangkau. Dapatkan pengalaman internet tanpa batas bersama kami!
                    </p>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 1 */}
                        <a href="#" className="group relative block bg-slate-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 no-underline">
                            <img
                                alt="15 Mbps Merdeka"
                                src="/img/gambar1.jpeg"
                                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
                            />
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-pink-400">Paket Internet</p>
                                <p className="text-lg md:text-xl font-bold text-white">15 MBPS MERDEKA</p>
                                <div className="mt-2 md:mt-4">
                                    <p className="text-xs md:text-sm text-gray-300">
                                        Cocok untuk penggunaan harian seperti streaming video, browsing, dan media sosial. Nikmati internet stabil tanpa gangguan!
                                    </p>
                                    <p className="mt-1 text-lg md:text-lg font-semibold text-white">Rp 150.000 per bulan</p>
                                </div>
                            </div>
                        </a>

                        {/* Card 2 */}
                        <a href="#" className="group relative block bg-slate-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 no-underline">
                            <img
                                alt="60 Mbps Merdeka"
                                src="/img/gambar10.jpeg"
                                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
                            />
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-pink-400">Paket Internet</p>
                                <p className="text-lg md:text-xl font-bold text-white">60 MBPS MERDEKA</p>
                                <div className="mt-2 md:mt-4">
                                    <p className="text-xs md:text-sm text-gray-300">
                                        Kecepatan tinggi yang ideal untuk rumah tangga atau kantor kecil. Streaming 4K, download file besar, dan gaming lancar!
                                    </p>
                                    <p className="mt-1 text-lg md:text-lg font-semibold text-white">Rp 250.000 per bulan</p>
                                </div>
                            </div>
                        </a>

                        {/* Card 3 */}
                        <a href="#" className="group relative block bg-slate-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 no-underline">
                            <img
                                alt="120 Mbps Premium"
                                src="/img/gambar3.jpeg"
                                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
                            />
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-pink-400">TV Channel langganan</p>
                                <p className="text-lg md:text-xl font-bold text-white">MNCTV 48 Channel</p>
                                <div className="mt-2 md:mt-4">
                                    <p className="text-xs md:text-sm text-gray-300">
                                        Nikmati nonton tv tanpa batas dengan kualitas yang premium
                                    </p>
                                    <p className="mt-1 text-lg md:text-lg font-semibold text-white">Rp 100.000 per bulan</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="/locations"
                            className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700 transition duration-300 no-underline transform hover:scale-105"
                        >
                            Daftar Berlangganan Sekarang
                        </a>
                    </div>
                </div>
            </section>
            {/* Solusi Internet Section */}
            <section className="py-16 bg-gray-50 relative" data-aos="fade-up">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 flex items-center justify-center animate-fade-in">
                        <span className="mr-3 text-5xl text-indigo-600">
                            <i className="fas fa-star"></i>
                        </span>
                        Layanan Terbaik Kami Untuk Anda!
                        <span className="ml-3 text-5xl text-indigo-600">
                            <i className="fas fa-star"></i>
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {/* Card 1 */}
                        <a
                            href="#"
                            className="group relative block h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 no-underline"
                            style={{ perspective: "1000px" }}
                        >
                            <img
                                src="/img/icon.jpeg"
                                alt="Koneksi Stabil"
                                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                            />
                            <span className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-white"></span>

                            <div className="relative flex h-full items-end p-4">
                                <div className="bg-black bg-opacity-50 p-4 rounded-lg transition-transform transform group-hover:translate-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white">Koneksi Stabil</h3>
                                    <p className="text-white text-xs sm:text-sm mt-1">
                                        Koneksi internet yang cepat dan stabil untuk kebutuhan Anda sehari-hari.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Card 2 */}
                        <a
                            href="#"
                            className="group relative block h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 no-underline"
                            style={{ perspective: "1000px" }}
                        >
                            <img
                                src="/img/icon2.jpg"
                                alt="Kecepatan Maksimal"
                                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                            />
                            <span className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-white"></span>

                            <div className="relative flex h-full items-end p-4">
                                <div className="bg-black bg-opacity-50 p-4 rounded-lg transition-transform transform group-hover:translate-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white">Kecepatan Maksimal</h3>
                                    <p className="text-white text-xs sm:text-sm mt-1">
                                        Nikmati pengalaman internet terbaik dengan kecepatan maksimal.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Card 3 */}
                        <a
                            href="#"
                            className="group relative block h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 no-underline"
                            style={{ perspective: "1000px" }}
                        >
                            <img
                                src="/img/icon3.jpeg"
                                alt="Teknologi Terbaru"
                                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                            />
                            <span className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-white"></span>

                            <div className="relative flex h-full items-end p-4">
                                <div className="bg-black bg-opacity-50 p-4 rounded-lg transition-transform transform group-hover:translate-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white">Teknologi Terbaru</h3>
                                    <p className="text-white text-xs sm:text-sm mt-1">
                                        Dukungan infrastruktur terbaru untuk koneksi yang lebih cepat.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Card 4 */}
                        <a
                            href="#"
                            className="group relative block h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 no-underline"
                            style={{ perspective: "1000px" }}
                        >
                            <img
                                src="/img/icon4.jpeg"
                                alt="Service Support 24/7"
                                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                            />
                            <span className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-white"></span>

                            <div className="relative flex h-full items-end p-4">
                                <div className="bg-black bg-opacity-50 p-4 rounded-lg transition-transform transform group-hover:translate-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white">Service Support 24/7</h3>
                                    <p className="text-white text-xs sm:text-sm mt-1">
                                        Layanan pelanggan kami siap membantu Anda kapan saja jika mengalami masalah teknis.
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
            {/* Section: Cara Berlangganan */}
            <section className="py-16 text-center relative" data-aos="fade-up">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="animate-pulse h-full w-full bg-white-to-r from-indigo-200 via-purple-200 to-blue-300"></div>
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Cara Berlangganan di Maxnet</h2>
                    <p className="mb-12 text-lg text-gray-600">Tiga langkah mudah untuk menggunakan layanan dari kami</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1: Registrasi */}
                        <div className="relative block overflow-hidden bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl" data-aos="fade-up">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full transition-transform transform hover:rotate-12 hover:scale-110">
                                    <i className="fas fa-user-plus fa-4x text-blue-500 animate-bounce"></i>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Registrasi</h3>
                            <p className="text-gray-600">Lengkapi formulir pendaftaran dan pilih paket layanan yang Anda inginkan.</p>
                        </div>

                        {/* Step 2: Verifikasi */}
                        <div className="relative block overflow-hidden bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl" data-aos="fade-up">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full transition-transform transform hover:rotate-12 hover:scale-110">
                                    <i className="fas fa-check fa-4x text-blue-500 animate-bounce"></i>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Verifikasi</h3>
                            <p className="text-gray-600">Tunggu hingga verifikasi selesai dan layanan siap digunakan.</p>
                        </div>

                        {/* Step 3: Aktivasi */}
                        <div className="relative block overflow-hidden bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl" data-aos="fade-up">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full transition-transform transform hover:rotate-12 hover:scale-110">
                                    <i className="fas fa-wifi fa-4x text-blue-500 animate-bounce"></i>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Aktivasi</h3>
                            <p className="text-gray-600">Layanan internet Anda aktif dan siap digunakan kapan pun Anda butuhkan.</p>
                        </div>
                    </div>

                    {/* Mobile Styling */}
                    <style>{`
                        @media (max-width: 768px) {
                            .grid {
                                grid-template-columns: 1fr; /* Stack vertically on mobile */
                            }

                            h2 {
                                font-size: 2.5rem; /* Adjust title size for mobile */
                            }

                            .fa-4x {
                                font-size: 3rem; /* Adjust icon size for mobile */
                            }

                            p {
                                font-size: 1rem; /* Adjust paragraph size for mobile */
                            }
                        }
                    `}</style>
                </div>
            </section>
        </AppLayout>      
    );
}