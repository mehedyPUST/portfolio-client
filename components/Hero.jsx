'use client';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import Image from 'next/image';
import { BsGithub } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

export default function Hero() {
    const resumeLink = 'https://drive.google.com/your-resume-id'; // ← replace with real link

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-800/20 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">
                        Mehedy Hasan
                    </h1>
                    <h2 className="text-xl md:text-2xl text-emerald-50 dark:text-gray-200 mb-6">
                        Full‑Stack Developer | Physics Researcher
                    </h2>
                    <p className="text-emerald-100 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8">
                        Bridging the gap between scientific thinking and modern web technologies.
                        Building digital experiences with precision, curiosity, and clean code.
                    </p>

                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-full transition shadow-lg"
                    >
                        <Download size={20} /> Download Resume
                    </a>

                    <div className="flex gap-4 mt-8 justify-center md:justify-start">
                        <a href="https://github.com/yourgithub" target="_blank" className="text-emerald-100 dark:text-gray-400 hover:text-amber-400 transition">
                            <BsGithub size={24} />
                        </a>
                        <a href="https://linkedin.com/in/yourlinkedin" target="_blank" className="text-emerald-100 dark:text-gray-400 hover:text-amber-400 transition">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://facebook.com/yourfacebook" target="_blank" className="text-emerald-100 dark:text-gray-400 hover:text-amber-400 transition">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex-1 flex justify-center"
                >
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-amber-400 overflow-hidden shadow-2xl">
                        <Image
                            src="/mehedy.jpg"
                            alt="Mehedy Hasan"
                            width={320}
                            height={320}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}