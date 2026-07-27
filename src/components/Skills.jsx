'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Server,
    Wrench,
    Monitor,
    Lock,
    Star,
} from 'lucide-react';
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
        icon: <Monitor className="w-5 h-5" />,
        skills: [
            { name: 'Next.js', level: 90, icon: <SiNextdotjs className="text-gray-800 dark:text-gray-200" /> },
            { name: 'React', level: 92, icon: <SiReact className="text-cyan-400" /> },
            { name: 'JavaScript', level: 88, icon: <Code2 className="text-yellow-400" /> },
            { name: 'TypeScript', level: 80, icon: <SiTypescript className="text-blue-600" /> },
            { name: 'Tailwind CSS', level: 94, icon: <SiTailwindcss className="text-teal-400" /> },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        icon: <Server className="w-5 h-5" />,
        skills: [
            { name: 'Node.js', level: 88, icon: <SiNodedotjs className="text-green-500" /> },
            { name: 'Express.js', level: 86, icon: <Server className="text-gray-400" /> },
            { name: 'MongoDB', level: 82, icon: <SiMongodb className="text-green-600" /> },
            { name: 'JWT / Auth', level: 80, icon: <Lock className="text-blue-400" /> },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: <Wrench className="w-5 h-5" />,
        skills: [
            { name: 'Git / GitHub', level: 90, icon: <SiGithub className="text-gray-400" /> },
            { name: 'Vercel', level: 85, icon: <SiVercel className="text-black dark:text-white" /> },
            { name: 'Netlify', level: 80, icon: <SiNetlify className="text-teal-500" /> },
        ],
    },
];

// A rotating palette of distinct gradients – the order changes per skill index
const barColors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-emerald-500 to-teal-400',
    'from-amber-500 to-orange-400',
    'from-rose-500 to-red-400',
    'from-indigo-500 to-violet-400',
    'from-lime-500 to-green-400',
    'from-fuchsia-500 to-purple-400',
];

const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Proficient';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
};

export default function Skills() {
    const [activeTab, setActiveTab] = useState('frontend');
    const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

    return (
        <section id="skills" className="py-20 bg-emerald-50 dark:bg-gray-800 relative overflow-hidden scroll-mt-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.04),transparent_50%)] animate-pulse" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                            Skills & Expertise
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Technologies I work with daily
                        </p>
                    </div>

                    <div className="flex justify-center gap-2 mb-10 relative">
                        {skillCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === category.id
                                    ? 'text-amber-600 dark:text-amber-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300'
                                    }`}
                            >
                                {category.icon}
                                {category.label}
                            </button>
                        ))}
                        <motion.div
                            className="absolute bottom-0 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"
                            layoutId="activeTab"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{
                                left: `calc(${skillCategories.findIndex(c => c.id === activeTab)} * (100% / ${skillCategories.length}) + 5%)`,
                                width: `calc(${100 / skillCategories.length}% - 10%)`,
                            }}
                        />
                    </div>

                    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {activeCategory?.skills.map((skill, index) => {
                                    const label = getLevelLabel(skill.level);
                                    // Pick a color based on index – cycles through the palette
                                    const colorClass = barColors[index % barColors.length];
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08, type: 'spring', stiffness: 300 }}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="group p-2 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-3">
                                                    <motion.span
                                                        className="text-xl"
                                                        animate={{ y: [0, -4, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                                                    >
                                                        {skill.icon}
                                                    </motion.span>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                                        {label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                                        {skill.level}%
                                                    </span>
                                                    {skill.level >= 90 && (
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {[
                            { name: 'Next.js', icon: <SiNextdotjs /> },
                            { name: 'React', icon: <SiReact /> },
                            { name: 'JavaScript', icon: <Code2 /> },
                            { name: 'TypeScript', icon: <SiTypescript /> },
                            { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
                            { name: 'Node.js', icon: <SiNodedotjs /> },
                            { name: 'Express.js', icon: <Server /> },
                            { name: 'MongoDB', icon: <SiMongodb /> },
                            { name: 'GitHub', icon: <SiGithub /> },
                            { name: 'Vercel', icon: <SiVercel /> },
                            { name: 'Netlify', icon: <SiNetlify /> },
                        ].map((tech, i) => (
                            <motion.span
                                key={tech.name}
                                whileHover={{ scale: 1.15, rotate: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:border-amber-400 dark:hover:border-amber-500 transition-colors cursor-default"
                            >
                                {tech.icon}
                                {tech.name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}