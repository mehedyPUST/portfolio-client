'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Wrench, Monitor, Lock } from 'lucide-react';
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiGithub,
    SiVercel,
    SiTypescript,
    SiNetlify,
} from 'react-icons/si';

const skillCategories = [
    {
        id: 'frontend',
        label: 'Frontend',
        icon: Monitor,
        skills: [
            { name: 'Next.js', level: 90, icon: SiNextdotjs, iconClass: 'text-gray-800 dark:text-gray-200' },
            { name: 'React', level: 92, icon: SiReact, iconClass: 'text-cyan-500' },
            { name: 'JavaScript', level: 88, icon: Code2, iconClass: 'text-amber-500' },
            { name: 'TypeScript', level: 80, icon: SiTypescript, iconClass: 'text-blue-600' },
            { name: 'Tailwind CSS', level: 94, icon: SiTailwindcss, iconClass: 'text-teal-500' },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        icon: Server,
        skills: [
            { name: 'Node.js', level: 88, icon: SiNodedotjs, iconClass: 'text-green-600' },
            { name: 'Express.js', level: 86, icon: Server, iconClass: 'text-gray-500 dark:text-gray-400' },
            { name: 'MongoDB', level: 82, icon: SiMongodb, iconClass: 'text-primary-600 dark:text-primary-400' },
            { name: 'JWT / Auth', level: 80, icon: Lock, iconClass: 'text-blue-500' },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: Wrench,
        skills: [
            { name: 'Git / GitHub', level: 90, icon: SiGithub, iconClass: 'text-gray-700 dark:text-gray-300' },
            { name: 'Vercel', level: 85, icon: SiVercel, iconClass: 'text-gray-900 dark:text-white' },
            { name: 'Netlify', level: 80, icon: SiNetlify, iconClass: 'text-teal-500' },
        ],
    },
];

const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Proficient';
    if (level >= 70) return 'Intermediate';
    return 'Familiar';
};

export default function Skills() {
    const [activeTab, setActiveTab] = useState('frontend');

    useEffect(() => {
        const exists = skillCategories.some((cat) => cat.id === activeTab);
        if (!exists) setActiveTab(skillCategories[0]?.id || 'frontend');
    }, [activeTab]);

    const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

    return (
        <section
            id="skills"
            className="py-20 sm:py-24 bg-white dark:bg-dark-surface scroll-mt-20 border-y border-gray-100 dark:border-dark-border"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
                    {/* LEFT — Title + categories */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="md:w-[38%] flex flex-col justify-center md:pr-10 lg:pr-12 py-2"
                    >
                        <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
                            Capabilities
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-light">
                            Skills & Expertise
                        </h2>
                        <div className="w-11 h-1 bg-primary-500 rounded-full mt-4 mb-4" />

                        <p className="text-sm text-gray-600 dark:text-light-muted leading-relaxed max-w-sm hidden md:block mb-6">
                            Tools and technologies I use to design, build, and ship production web applications.
                        </p>

                        <div className="flex md:flex-col gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-0 -mx-1 px-1">
                            {skillCategories.map((category) => {
                                const isActive = activeTab === category.id;
                                const Icon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => setActiveTab(category.id)}
                                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 ${isActive
                                                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                                                : 'bg-gray-50 dark:bg-dark-elevated text-gray-700 dark:text-light-muted hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-100 dark:border-dark-border'
                                            }`}
                                    >
                                        <span
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${isActive
                                                    ? 'bg-white/15'
                                                    : 'bg-white dark:bg-dark-surface text-primary-600 dark:text-primary-400'
                                                }`}
                                        >
                                            <Icon size={16} />
                                        </span>
                                        <span className="flex-1 text-left">{category.label}</span>
                                        <span
                                            className={`text-[11px] tabular-nums ${isActive
                                                    ? 'text-white/70'
                                                    : 'text-gray-400 dark:text-light-muted'
                                                }`}
                                        >
                                            {category.skills.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Divider bar — your original thick gradient bar */}
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.5 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                        className="hidden md:block w-1.5 min-h-[400px] self-stretch mx-6 lg:mx-8 rounded-full bg-gradient-to-b from-primary-500 via-primary-400/60 to-primary-500/10"
                    />

                    {/* RIGHT — Skill list */}
                    <div className="md:w-[55%] flex flex-col justify-center mt-8 md:mt-0 md:pl-2 py-2 min-h-[280px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-3"
                            >
                                <div className="flex items-center justify-between mb-1 px-0.5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-light tracking-tight">
                                        {activeCategory?.label}
                                    </h3>
                                    <span className="text-xs text-gray-400 dark:text-light-muted">
                                        {activeCategory?.skills.length} skills
                                    </span>
                                </div>

                                {activeCategory?.skills.map((skill, index) => {
                                    const Icon = skill.icon;
                                    const label = getLevelLabel(skill.level);

                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="rounded-xl border border-gray-200/90 dark:border-dark-border bg-[#F8FAFA] dark:bg-dark-elevated/80 p-4 sm:p-4.5 hover:border-primary-300/50 dark:hover:border-primary-500/30 hover:bg-white dark:hover:bg-dark-elevated transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border shadow-sm shrink-0">
                                                    <Icon className={`w-[18px] h-[18px] ${skill.iconClass}`} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-medium text-sm text-gray-900 dark:text-light truncate">
                                                            {skill.name}
                                                        </span>
                                                        <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-dark-border text-gray-500 dark:text-light-muted">
                                                            {label}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="text-sm font-semibold tabular-nums text-primary-600 dark:text-primary-400 shrink-0">
                                                    {skill.level}%
                                                </span>
                                            </div>

                                            <div className="h-1.5 w-full rounded-full bg-gray-200/80 dark:bg-dark-border overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{
                                                        duration: 0.9,
                                                        delay: 0.08 + index * 0.04,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}