'use client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Sparkles, Award } from 'lucide-react';

const educationItems = [
    {
        title: 'M.Sc in Physics',
        school: 'Pabna University of Science & Technology',
        focus: 'Thesis: Solid State Physics',
        period: '2020 – 2022',
        icon: GraduationCap,
    },
    {
        title: 'B.Sc in Physics',
        school: 'Pabna University of Science & Technology',
        focus: 'Focus: Solid State Physics',
        period: '2016 – 2020',
        icon: BookOpen,
    },
];

export default function Education() {
    return (
        <section
            id="education"
            className="py-20 sm:py-24 bg-[#F8FAFA] dark:bg-dark scroll-mt-20 relative overflow-hidden border-y border-gray-100 dark:border-dark-border"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,237,100,0.04),transparent_55%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="md:w-[38%] flex flex-col justify-center md:pr-10 lg:pr-12 py-2"
                    >
                        <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
                            Academic path
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-light">
                            Education
                        </h2>
                        <div className="w-11 h-1 bg-primary-500 rounded-full mt-4 mb-4" />

                        <p className="text-sm text-gray-600 dark:text-light-muted leading-relaxed max-w-sm mb-6">
                            Academic foundation in Physics combined with hands-on web development training.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary-50/90 via-white to-primary-100/50 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 px-4 py-3.5 shadow-sm"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-500/15 shrink-0">
                                <Sparkles className="text-primary-600 dark:text-primary-400" size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-500 dark:text-light-muted">
                                    Web Development Training
                                </p>
                                <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 mt-0.5">
                                    Programming Hero · Batch 13
                                </p>
                            </div>
                            <Award className="text-primary-500 dark:text-primary-400 shrink-0" size={16} />
                        </motion.div>
                    </motion.div>

                    {/* Divider bar */}
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.5 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                        className="hidden md:block w-1.5 min-h-[360px] self-stretch mx-6 lg:mx-8 rounded-full bg-gradient-to-b from-primary-500 via-primary-400/60 to-primary-500/10"
                    />

                    {/* RIGHT */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                            },
                        }}
                        className="md:w-[55%] flex flex-col justify-center space-y-4 mt-10 md:mt-0 md:pl-2 py-2"
                    >
                        {educationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={{
                                        hidden: { opacity: 0, x: 16 },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: { duration: 0.4, ease: 'easeOut' },
                                        },
                                    }}
                                    className="group relative rounded-2xl bg-gradient-to-br from-white via-gray-50/90 to-primary-50/80 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-primary-500/70 opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/25 group-hover:scale-[1.03] transition-transform duration-300">
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-light">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-light-muted mt-0.5">
                                                {item.school}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary-50 dark:bg-primary-500/15 text-primary-700 dark:text-primary-400">
                                                    {item.focus}
                                                </span>
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-dark-elevated text-gray-600 dark:text-light-muted">
                                                    {item.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}