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
            </div>
            {/* New Section - Solusi Internet Terbaik */}
            <section className="relative overflow-hidden bg-white">
                <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen gap-8">
                        
                        {/* Image Section */}
                        <div className="relative z-10">
                            <div className="relative h-48 sm:h-80 lg:h-full  overflow-hidden">
                                <img
                                    alt="Maxnet team at work"
                                    src="/img/about us.jpg"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="relative flex items-center bg-white rounded-lg shadow-lg lg:shadow-none">
                            <span className="hidden lg:block lg:absolute lg:inset-y-0 lg:-start-16 lg:w-16 lg:bg-white"></span>
                            
                            <div className="p-6 sm:p-12 lg:p-24">
                                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Tentang Maxnet
                                </h2>
                                
                                <p className="mt-3 text-gray-700 text-sm sm:text-base">
                                    Maxnet adalah penyedia layanan internet terdepan yang berkomitmen 
                                    untuk menghubungkan setiap orang dengan dunia digital. 
                                    Dengan inovasi tanpa henti dan infrastruktur yang solid, 
                                    kami memastikan Anda mendapatkan pengalaman online yang cepat, aman, dan terpercaya.
                                </p>

                                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                                    Kami percaya bahwa internet adalah jendela dunia, dan kami berdedikasi untuk memberikan 
                                    akses yang lebih baik kepada masyarakat. Dari individu hingga perusahaan, 
                                    Maxnet siap memenuhi berbagai kebutuhan internet Anda dengan layanan yang 
                                    dirancang khusus untuk memberikan kepuasan maksimal.
                                </p>

                                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                                    Dengan tim ahli yang selalu siap sedia, kami mengutamakan dukungan pelanggan yang luar biasa. 
                                    Di Maxnet, kepuasan Anda adalah prioritas utama kami, 
                                    dan kami berkomitmen untuk terus berinovasi demi memberikan yang terbaik bagi Anda.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
           
            {/* Section: Cara Berlangganan */}
            <section className="py-16 text-center relative" data-aos="fade-up">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="animate-pulse h-full w-full bg-white-to-r from-indigo-200 via-purple-200 to-blue-300"></div>
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
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