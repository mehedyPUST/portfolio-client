'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    BookOpen,
    Sparkles,
    Award,
    ExternalLink,
    BadgeCheck,
    Code2,
    ChevronDown,
    Eye,
} from 'lucide-react';
import Image from 'next/image';

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

const CERT_VERIFY_URL =
    'https://web.programming-hero.com/verification?validationNumber=PHbatch-13WEB13-42321572';

const techStack = [
    'HTML',
    'CSS',
    'JavaScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
];

export default function Education() {
    const [certOpen, setCertOpen] = useState(false);

    return (
        <>
            {/* ========== ACADEMIC EDUCATION (original layout) ========== */}
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
                                Academic foundation in Physics combined with hands-on web
                                development training.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15, duration: 0.4 }}
                                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary-50/90 via-white to-primary-100/50 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/20 px-4 py-3.5 shadow-sm"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-500/15 shrink-0">
                                    <Sparkles
                                        className="text-primary-600 dark:text-primary-400"
                                        size={16}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 dark:text-light-muted">
                                        Web Development Training
                                    </p>
                                    <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 mt-0.5">
                                        Programming Hero · Batch 13
                                    </p>
                                </div>
                                <Award
                                    className="text-primary-500 dark:text-primary-400 shrink-0"
                                    size={16}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Divider bar */}
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0.5 }}
                            whileInView={{ opacity: 1, scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                            className="hidden md:block w-1.5 min-h-[280px] self-stretch mx-6 lg:mx-8 rounded-full bg-gradient-to-b from-primary-500 via-primary-400/60 to-primary-500/10"
                        />

                        {/* RIGHT — degrees only */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.12 },
                                },
                            }}
                            className="md:w-[52%] flex flex-col gap-4 py-2 mt-8 md:mt-0"
                        >
                            {educationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        variants={{
                                            hidden: { opacity: 0, y: 16 },
                                            visible: { opacity: 1, y: 0 },
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

            {/* ========== PROGRAMMING HERO CERTIFICATE (expandable) ========== */}
            <section
                id="certificate"
                className="py-16 sm:py-20 bg-white dark:bg-dark-surface scroll-mt-20 relative overflow-hidden border-b border-gray-100 dark:border-dark-border"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,237,100,0.04),transparent_55%)] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="rounded-2xl border border-gray-200/80 dark:border-dark-border bg-gradient-to-br from-white via-gray-50/80 to-primary-50/50 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/15 shadow-sm overflow-hidden"
                    >
                        {/* Summary row — always visible */}
                        <div className="p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/25">
                                    <Award size={22} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-1.5">
                                        Professional credential
                                    </p>
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-light leading-snug">
                                        Complete Web Development Course
                                    </h3>
                                    <div className="w-11 h-1 bg-primary-500 rounded-full mt-3 mb-3" />

                                    <p className="text-sm font-medium text-primary-700 dark:text-primary-400">
                                        Programming Hero · Batch 13 · with Excellence
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-light-muted leading-relaxed max-w-xl">
                                        Full-stack program covering modern frontend, backend
                                        APIs, databases, and AI-assisted development practices —
                                        completed January to July 2026.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-500/15 text-primary-700 dark:text-primary-400"
                                            >
                                                <Code2 size={10} className="opacity-70" />
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-dark-elevated text-gray-600 dark:text-light-muted">
                                            WEB13-4232
                                        </span>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-dark-elevated text-gray-600 dark:text-light-muted">
                                            Jan – Jul 2026
                                        </span>
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setCertOpen((v) => !v)}
                                            aria-expanded={certOpen}
                                            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                                        >
                                            <Eye size={16} />
                                            {certOpen ? 'Hide certificate' : 'View certificate'}
                                            <ChevronDown
                                                size={16}
                                                className={`opacity-90 transition-transform duration-300 ${certOpen ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <a
                                            href={CERT_VERIFY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white/80 dark:bg-dark-elevated text-gray-700 dark:text-light text-sm font-medium px-4 py-2.5 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
                                        >
                                            <BadgeCheck
                                                size={16}
                                                className="text-primary-600 dark:text-primary-400"
                                            />
                                            Verify online
                                            <ExternalLink size={14} className="opacity-70" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown panel — certificate image */}
                        <AnimatePresence initial={false}>
                            {certOpen && (
                                <motion.div
                                    key="cert-panel"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden border-t border-gray-200/80 dark:border-dark-border"
                                >
                                    <div className="p-5 sm:p-8 bg-gray-50/80 dark:bg-dark/40">
                                        <a
                                            href={CERT_VERIFY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative block mx-auto max-w-3xl rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-dark-elevated p-4 sm:p-6"
                                        >
                                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                                                <Image
                                                    src="/web-dev-cert.png"
                                                    alt="Programming Hero Complete Web Development Certificate — Md. Mehedy Hasan"
                                                    fill
                                                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                                    sizes="(max-width: 768px) 100vw, 768px"
                                                />
                                            </div>
                                            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 inline-flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Open verification
                                                <ExternalLink size={12} />
                                            </div>
                                        </a>
                                        <p className="mt-4 text-center text-xs text-gray-500 dark:text-light-muted">
                                            Click the certificate to verify on Programming Hero
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </>
    );
}