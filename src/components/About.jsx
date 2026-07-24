'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
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
            "I’m Mehedy Hasan, a full‑stack web developer with an MSc in Physics from Pabna University of Science and Technology. My thesis in Solid State Physics honed a rigorous, analytical approach to problem‑solving — a mindset I now apply daily to writing clean, efficient, and scalable code.",
            "My path into web development started at university, driven by a fascination with building things from scratch. I later completed the Programming Hero Bootcamp (Batch 13), where I deepened my expertise in React, Next.js, Node.js, Express, and MongoDB. My physics research background accelerated my ability to understand complex systems, making the transition to full‑stack development natural and rewarding.",
            "What excites me most is the fusion of logic and creativity in software engineering. Whether architecting a RESTful API, crafting a responsive Tailwind UI, or debugging state‑management issues, I tackle every challenge with a researcher’s curiosity and a builder’s precision — always focused on delivering robust, real‑world solutions.",
        ];

    return (
        <>
            <section id="about" className="py-20 bg-white dark:bg-gray-900 relative">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-12 text-center">
                            About Me
                        </h2>

                        {/* Paragraph cards from backend */}
                        <div className="space-y-6 md:space-y-8">
                            {paragraphs.map((p, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className={`
                      relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md
                      border-l-4 border-emerald-500
                      md:w-11/12
                      ${isEven ? 'md:mr-auto' : 'md:ml-auto'}
                    `}
                                    >
                                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
                                            {p}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Hardcoded quote – appears below all paragraphs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-10 md:mt-12 flex justify-center"
                        >
                            <div className="relative bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-gray-800 dark:to-gray-800/80 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl px-8 py-6 max-w-xl text-center shadow-sm">
                                {/* Quotation mark decorative elements */}
                                <span className="absolute top-2 left-4 text-5xl text-emerald-400 dark:text-emerald-600 opacity-40 font-serif leading-none">
                                    “
                                </span>
                                <span className="absolute bottom-2 right-4 text-5xl text-emerald-400 dark:text-emerald-600 opacity-40 font-serif leading-none rotate-180">
                                    ”
                                </span>

                                <p className="relative text-gray-700 dark:text-gray-300 text-lg md:text-xl italic font-medium leading-relaxed px-4">
                                    The unknown doesn’t hold me back — it fuels my drive to explore, learn, and build.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {isAuthenticated && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-lg text-sm"
                    >
                        <Edit size={14} /> Edit
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