'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, User, MapPin, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EditAboutModal from './admin/EditAboutModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function About() {
    const { isAuthenticated } = useAuth();
    const [aboutData, setAboutData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchAbout = () => {
        fetch(`${BACKEND_URL}/api/about`)
            .then((r) => r.json())
            .then(setAboutData)
            .catch(() => { });
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    const paragraphs = aboutData?.paragraphs?.length
        ? aboutData.paragraphs
        : [
            "I'm Mehedy Hasan, a full‑stack developer with an MSc in Physics from Pabna University of Science & Technology.",
            "I completed web development training at Programming Hero Bootcamp (Batch 13).",
            "Outside coding, I enjoy science documentaries, chess, and quantum mechanics.",
        ];

    return (
        <>
            <section
                id="about"
                className="relative py-24 bg-gradient-to-br from-white via-emerald-50/40 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/60 dark:bg-emerald-900/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="text-center mb-16">
                            <h2 className="inline-block text-3xl md:text-4xl font-bold text-gray-900 dark:text-white relative">
                                About Me
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-emerald-500 rounded-full" />
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-12 items-start">
                            <div className="lg:col-span-3 space-y-8">
                                <div className="prose prose-lg prose-emerald dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {paragraphs.map((p, i) => (
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            className="text-lg"
                                        >
                                            {p}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-emerald-100/50 dark:shadow-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30"
                                >
                                    <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-6 flex items-center gap-2">
                                        <User size={18} /> Quick Facts
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-3">
                                            <MapPin size={16} className="mt-0.5 text-emerald-500 shrink-0" />
                                            <span>Based in Bangladesh</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Award size={16} className="mt-0.5 text-emerald-500 shrink-0" />
                                            <span>MSc in Physics</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {isAuthenticated && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shadow-sm text-sm font-medium"
                    >
                        <Edit size={15} /> Edit Section
                    </button>
                )}
            </section>

            {showEditModal && (
                <EditAboutModal
                    aboutData={aboutData}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={() => {
                        fetchAbout();
                        setShowEditModal(false);
                    }}
                />
            )}
        </>
    );
}