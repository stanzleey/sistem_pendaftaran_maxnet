import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

const Thankyou = () => {
    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 px-4">
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg text-center w-full max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                        Terima Kasih!
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                        Terima kasih telah mengirimkan formulir pendaftaran. Tim kami akan segera menghubungi Anda melalui nomor telepon yang Anda kirimkan untuk memastikan ketersediaan layanan kami di lokasi Anda.
                    </p>
                    <a
                        href="/"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:opacity-90 transition duration-300 no-underline text-sm md:text-base"
                    >
                        Kembali ke Beranda
                    </a>
                </div>
            </div>
        </AppLayout>
    );
};

export default Thankyou;
