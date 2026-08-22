'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Server,
    Wrench,
    Monitor,
    Lock,
    Sparkles,
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
            { name: 'MongoDB', level: 82, icon: <SiMongodb className="text-primary-500" /> },
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

const barColors = [
    'from-primary-500 to-primary-400',
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

    useEffect(() => {
        const exists = skillCategories.some((cat) => cat.id === activeTab);
        if (!exists) {
            setActiveTab(skillCategories[0]?.id || 'frontend');
        }
    }, [activeTab]);

    const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <section id="skills" className="py-24 bg-white dark:bg-dark-surface scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="flex flex-col md:flex-row items-stretch justify-center gap-0"
                >
                    {/* LEFT – Title + Category Selector */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="md:w-2/5 flex flex-col justify-center space-y-4 pr-0 md:pr-12 py-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Skills & Expertise
                        </h2>
                        <div className="w-12 h-1 bg-primary-500 rounded-full mb-2 md:mb-4" />

                        <p className="text-gray-600 dark:text-gray-300 text-sm hidden md:block">
                            Select a category to explore my technical skills.
                        </p>

                        {/* Mobile: horizontal | Desktop: vertical */}
                        <div className="flex md:flex-col gap-2.5 md:gap-3 mt-2 md:mt-4 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                            {skillCategories.map((category) => {
                                const isActive = activeTab === category.id;
                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${isActive
                                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                            : 'bg-primary-50 dark:bg-dark-elevated text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-dark-border'
                                            }`}
                                    >
                                        <span className="text-base md:text-lg">{category.icon}</span>
                                        {category.label}
                                        {isActive && (
                                            <span className="ml-1 md:ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white hidden md:inline">
                                                Active
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Separation Bar */}
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.5 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="hidden md:block w-1.5 min-h-[400px] bg-gradient-to-b from-primary-500 via-primary-400/60 to-primary-500/10 rounded-full mx-8 self-stretch"
                    />

                    {/* RIGHT – Skills List */}
                    <div className="md:w-3/5 flex flex-col justify-center space-y-4 mt-8 md:mt-0 pl-0 md:pl-4 py-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-4"
                            >
                                {activeCategory?.skills.map((skill, index) => {
                                    const label = getLevelLabel(skill.level);
                                    const colorClass = barColors[index % barColors.length];
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            variants={itemVariants}
                                            whileHover={{ y: -2 }}
                                            className="bg-primary-50 dark:bg-dark-elevated rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-dark-border/50"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{skill.icon}</span>
                                                    <span className="font-medium text-gray-800 dark:text-white">
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-gray-300 font-medium">
                                                        {label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-primary-500 dark:text-primary-400">
                                                        {skill.level}%
                                                    </span>
                                                    {skill.level >= 90 && (
                                                        <Sparkles className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{
                                                        duration: 1.2,
                                                        delay: index * 0.05,
                                                        ease: 'easeOut',
                                                    }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}