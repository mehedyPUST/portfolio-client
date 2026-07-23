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
        fetch(`${BACKEND_URL}/api/hero`).then(r => r.json()).then(setHeroData).catch(() => { });
    };

    useEffect(() => { fetchHero(); }, []);

    const title = heroData?.title || 'Mehedy Hasan';
    const subtitle = heroData?.subtitle || 'Full‑Stack Developer | Physics Researcher';
    const description = heroData?.description || 'Bridging the gap between scientific thinking and modern web technologies.';
    const resumeLink = heroData?.resumeLink || '#';
    const github = heroData?.github || '#';
    const linkedin = heroData?.linkedin || '#';
    const facebook = heroData?.facebook || '#';
    const photoUrl = heroData?.photoUrl || '/mehedy.jpg';

    return (
        <>
            <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-800/20 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">{title}</h1>
                        <h2 className="text-xl md:text-2xl text-emerald-50 dark:text-gray-200 mb-6">{subtitle}</h2>
                        <p className="text-emerald-100 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8">{description}</p>
                        <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-full transition shadow-lg"><Download size={20} /> Download Resume</a>
                        <div className="flex gap-4 mt-8 justify-center md:justify-start">
                            <a href={github} target="_blank" className="text-emerald-100 hover:text-amber-400"><FaGithub size={24} /></a>
                            <a href={linkedin} target="_blank" className="text-emerald-100 hover:text-amber-400"><FaLinkedin size={24} /></a>
                            <a href={facebook} target="_blank" className="text-emerald-100 hover:text-amber-400"><FaFacebook size={24} /></a>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex-1 flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-amber-400 overflow-hidden shadow-2xl">
                            <Image src={photoUrl} alt={title} width={320} height={320} className="object-cover w-full h-full" priority />
                        </div>
                    </motion.div>
                </div>
                {isAuthenticated && (
                    <button onClick={() => setShowEditModal(true)} className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm"><Edit size={14} /> Edit</button>
                )}
            </section>
            {showEditModal && <EditHeroModal heroData={heroData} onClose={() => setShowEditModal(false)} onUpdate={() => { fetchHero(); setShowEditModal(false); }} />}
        </>
    );
}