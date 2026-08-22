'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Edit } from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import EditHeroModal from './admin/EditHeroModal';
import HeroSkeleton from './HeroSkeleton';
import ParticlesBackground from './ParticlesBackground';
import MagneticButton from './MagneticButton';

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

    if (!heroData) return <HeroSkeleton />;

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
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-dark/90 dark:from-dark dark:via-dark-surface dark:to-primary-900/20 relative overflow-hidden"
            >
                {/* Particles Background */}
                <ParticlesBackground />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-[1]" />

                {/* Gradient Glow Effects */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse z-[1]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse delay-1000 z-[1]" />

                <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center md:text-left"
                    >
                        {/* 🌟 Animated Gradient Name */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#00ED64] via-[#50F094] to-[#00ED64] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                {title}
                            </span>
                        </h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/90 dark:text-gray-200 mb-6 font-medium"
                        >
                            {subtitle}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/80 dark:text-gray-300 max-w-lg mx-auto md:mx-0 mb-8 text-lg leading-relaxed"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <MagneticButton
                                href={resumeLink}
                                className="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-dark font-semibold px-8 py-4 rounded-full transition shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 text-lg"
                            >
                                <Download size={22} /> Download Resume
                            </MagneticButton>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-5 mt-8 justify-center md:justify-start"
                        >
                            <a
                                href={github}
                                target="_blank"
                                className="text-white/80 hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,237,100,0.5)]"
                                aria-label="GitHub"
                            >
                                <FaGithub size={26} />
                            </a>
                            <a
                                href={linkedin}
                                target="_blank"
                                className="text-white/80 hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,237,100,0.5)]"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={26} />
                            </a>
                            <a
                                href={facebook}
                                target="_blank"
                                className="text-white/80 hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,237,100,0.5)]"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={26} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className="relative group">
                            {/* Outer Glow Ring */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />

                            {/* Inner Glow */}
                            <div className="absolute -inset-2 bg-primary-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

                            {/* Profile Image Container */}
                            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary-400/80 shadow-2xl shadow-primary-400/20 group-hover:border-primary-300 transition-all duration-300">
                                <Image
                                    src={photoUrl || '/mehedy.jpg'}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 288px, 384px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Edit Button for Admin */}
                {isAuthenticated && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition-all duration-200 z-20 border border-white/20 hover:border-white/40 hover:scale-105"
                    >
                        <Edit size={14} /> Edit
                    </button>
                )}
            </section>

            {/* Edit Modal */}
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