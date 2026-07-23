'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import EditHeroModal from './admin/EditHeroModal';
import { Download, Edit } from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Hero() {
    const { isAuthenticated } = useAuth();
    const [heroData, setHeroData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchHero = () => {
        fetch(`${BACKEND_URL}/api/hero`)
            .then((r) => r.json())
            .then(setHeroData)
            .catch(() => { });
    };

    useEffect(() => {
        fetchHero();
    }, []);

    const title = heroData?.title || 'Mehedy Hasan';
    const subtitle = heroData?.subtitle || 'Full‑Stack Developer | Physics Researcher';
    const description =
        heroData?.description ||
        'Bridging the gap between scientific thinking and modern web technologies.';
    const resumeLink = heroData?.resumeLink || '#';
    const github = heroData?.github || '#';
    const linkedin = heroData?.linkedin || '#';
    const facebook = heroData?.facebook || '#';
    const photoUrl = heroData?.photoUrl || '/mehedy.jpg';

    return (
        <>
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-800/20 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20 relative overflow-hidden"
            >
                {/* Grid background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">

                    {/* Left: Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-400 mb-4"
                        >
                            {title}
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-emerald-50 dark:text-gray-200 mb-6 font-medium"
                        >
                            {subtitle}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-emerald-100 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 text-lg leading-relaxed"
                        >
                            {description}
                        </motion.p>

                        {/* Resume button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href={resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-8 py-4 rounded-full transition shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 text-lg"
                            >
                                <Download size={22} />
                                Download Resume
                            </a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-5 mt-8 justify-center md:justify-start"
                        >
                            <a
                                href={github}
                                target="_blank"
                                className="text-emerald-100 hover:text-amber-400 transition-colors duration-200 transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <FaGithub size={26} />
                            </a>
                            <a
                                href={linkedin}
                                target="_blank"
                                className="text-emerald-100 hover:text-amber-400 transition-colors duration-200 transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={26} />
                            </a>
                            <a
                                href={facebook}
                                target="_blank"
                                className="text-emerald-100 hover:text-amber-400 transition-colors duration-200 transform hover:scale-110"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={26} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Big circular photo with glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className="relative group">
                            {/* Outer pulsing glow ring */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />

                            {/* Secondary glow */}
                            <div className="absolute -inset-2 bg-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

                            {/* Image container */}
                            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-2xl shadow-amber-500/20 group-hover:border-amber-300 transition-all duration-300">
                                <Image
                                    src={photoUrl || '/mehedy.jpg'}
                                    alt={title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Admin edit button */}
                {isAuthenticated && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition z-20"
                    >
                        <Edit size={14} />
                        Edit
                    </button>
                )}
            </section>

            {/* Edit modal */}
            {showEditModal && (
                <EditHeroModal
                    heroData={heroData}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={() => {
                        fetchHero();
                        setShowEditModal(false);
                    }}
                />
            )}
        </>
    );
}