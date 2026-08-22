'use client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Sparkles, Award } from 'lucide-react';

export default function Education() {
    return (
        <section
            id="education"
            className="py-24 bg-white dark:bg-dark-surface scroll-mt-20 relative overflow-hidden"
        >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,237,100,0.03),transparent_60%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="flex flex-col md:flex-row items-stretch justify-center gap-0"
                >
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="md:w-2/5 flex flex-col justify-center space-y-6 pr-8 md:pr-12 py-4"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Education
                            </h2>
                            <div className="w-12 h-1 bg-primary-500 rounded-full mt-4" />
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Academic foundation in Physics combined with hands-on web development training.
                        </p>

                        {/* Bootcamp highlight – no border */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0,237,100,0.1)' }}
                            className="inline-flex items-center gap-3 bg-gradient-to-br from-primary-50/90 via-white/90 to-primary-100/60 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 px-5 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <Sparkles className="text-primary-500 dark:text-primary-400 shrink-0" size={18} />
                            <div className="text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Web Development Training</span>
                                <p className="font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                                    Programming Hero · Batch 13
                                </p>
                            </div>
                            <Award className="text-primary-500 dark:text-primary-400 shrink-0 ml-auto" size={18} />
                        </motion.div>
                    </motion.div>

                    {/* Separation Bar */}
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.5 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="hidden md:block w-1.5 min-h-[360px] bg-gradient-to-b from-primary-500 via-primary-400/50 to-primary-500/10 rounded-full mx-8 self-stretch"
                    />

                    {/* Right Column – Timeline (Cards without borders) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2,
                                },
                            },
                        }}
                        className="md:w-3/5 flex flex-col justify-center space-y-6 mt-10 md:mt-0 pl-0 md:pl-4 py-4"
                    >
                        {/* M.Sc */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: 24, y: 12 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    transition: { duration: 0.5, ease: 'easeOut' },
                                },
                            }}
                            whileHover={{
                                y: -4,
                                boxShadow: '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,237,100,0.08)',
                                transition: { duration: 0.2 },
                            }}
                            className="group relative bg-gradient-to-br from-white via-gray-50/90 to-primary-50/80 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 mt-0.5 bg-primary-500 rounded-xl p-2.5 shadow-md shadow-primary-500/25 group-hover:scale-105 transition-transform duration-300">
                                    <GraduationCap className="text-white" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        M.Sc in Physics
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">
                                        Pabna University of Science & Technology
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <span className="text-xs px-2.5 py-1 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full font-medium">
                                            Thesis: Solid State Physics
                                        </span>
                                        <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 rounded-full">
                                            2020 – 2022
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* B.Sc */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: 24, y: 12 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    transition: { duration: 0.5, ease: 'easeOut' },
                                },
                            }}
                            whileHover={{
                                y: -4,
                                boxShadow: '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,237,100,0.08)',
                                transition: { duration: 0.2 },
                            }}
                            className="group relative bg-gradient-to-br from-white via-gray-50/90 to-primary-50/80 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 mt-0.5 bg-primary-500 rounded-xl p-2.5 shadow-md shadow-primary-500/25 group-hover:scale-105 transition-transform duration-300">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        B.Sc in Physics
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">
                                        Pabna University of Science & Technology
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <span className="text-xs px-2.5 py-1 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full font-medium">
                                            Focus: Solid State Physics
                                        </span>
                                        <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 rounded-full">
                                            2016 – 2020
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}