'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Quote } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EditAboutModal from './admin/EditAboutModal';
import AboutSkeleton from './AboutSkeleton';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const defaultAbout = {
    paragraphs: [
        "I'm Mehedy Hasan, a full-stack developer with an MSc in Physics from Pabna University of Science & Technology.",
        "I completed web development training at Programming Hero Bootcamp (Batch 13).",
        "Outside coding, I enjoy science documentaries, chess, and quantum mechanics.",
    ],
};

const QUOTE =
    "The unknown doesn't hold me back — it fuels my drive to explore, learn, and build.";

export default function About() {
    const { isAuthenticated } = useAuth();
    const [aboutData, setAboutData] = useState(defaultAbout);
    const [showEditModal, setShowEditModal] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const fetchAbout = () => {
        fetch(`${BACKEND_URL}/api/about`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.paragraphs?.length) setAboutData(data);
            })
            .catch(() => { });
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        setTypedText('');
        setShowCursor(true);

        const interval = setInterval(() => {
            if (i < QUOTE.length) {
                setTypedText(QUOTE.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowCursor(true), 400);
            }
        }, 28);

        return () => clearInterval(interval);
    }, []);

    if (!aboutData) return <AboutSkeleton />;

    const paragraphs =
        aboutData?.paragraphs?.length > 0
            ? aboutData.paragraphs
            : defaultAbout.paragraphs;

    return (
        <>
            <section
                id="about"
                className="py-20 sm:py-24 bg-white dark:bg-dark-surface scroll-mt-20 relative overflow-hidden border-y border-gray-100 dark:border-dark-border"
            >
                {/* Subtle background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,237,100,0.03),transparent_60%)] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
                        {/* ========== LEFT COLUMN ========== */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="md:w-2/5 flex flex-col justify-center space-y-6 md:pr-10 lg:pr-12 py-2"
                        >
                            {/* Heading */}
                            <div>
                                <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
                                    Get to know me
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-light">
                                    About Me
                                </h2>
                                <div className="w-11 h-1 bg-primary-500 rounded-full mt-4 mb-4" />
                                <p className="text-sm text-gray-600 dark:text-light-muted leading-relaxed max-w-sm">
                                    A brief introduction to my background and what drives me.
                                </p>
                            </div>

                            {/* Quote Card - no border */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="relative"
                            >
                                {/* Soft glow behind card */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-transparent rounded-2xl blur-xl opacity-60" />

                                <motion.div
                                    whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,237,100,0.12)' }}
                                    className="relative bg-gradient-to-br from-primary-50/90 via-white/90 to-primary-100/60 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 backdrop-blur-sm rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <Quote
                                        className="w-5 h-5 text-primary-500/80 mb-4"
                                        strokeWidth={1.8}
                                    />
                                    <p className="text-gray-800 dark:text-light text-[1.05rem] leading-relaxed italic font-medium min-h-[5rem]">
                                        {typedText}
                                        {showCursor && (
                                            <span className="inline-block w-[2px] h-[1.15em] ml-1 align-middle bg-primary-500 animate-pulse" />
                                        )}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* ========== SEPARATOR ========== */}
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0.6 }}
                            whileInView={{ opacity: 1, scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden md:block w-1.5 min-h-[360px] self-stretch mx-6 lg:mx-8 rounded-full bg-gradient-to-b from-primary-500 via-primary-400/60 to-primary-500/10"
                        />

                        {/* ========== RIGHT COLUMN (Cards - No Borders) ========== */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.13,
                                        delayChildren: 0.2,
                                    },
                                },
                            }}
                            className="md:w-3/5 flex flex-col justify-center space-y-4 mt-10 md:mt-0 md:pl-2 py-2"
                        >
                            {paragraphs.map((text, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, x: 28, y: 12 },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                ease: 'easeOut',
                                            },
                                        },
                                    }}
                                    whileHover={{
                                        y: -4,
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,237,100,0.08)',
                                        transition: { duration: 0.2 },
                                    }}
                                    className="group relative bg-gradient-to-br from-white via-gray-50/90 to-primary-50/80 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Left accent bar - soft, no border */}
                                    <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-primary-500/70 opacity-80 group-hover:opacity-100 transition-opacity" />

                                    <p className="pl-5 text-gray-700 dark:text-light-muted text-[1.05rem] leading-relaxed text-justify">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Admin Edit Button */}
                {isAuthenticated && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-primary-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        <Edit size={15} />
                        Edit About
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