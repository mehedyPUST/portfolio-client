'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Server,
    Wrench,
    Monitor,
    Lock,
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
            { name: 'Next.js', level: 90, icon: <SiNextdotjs className="text-gray-800" /> },
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
            { name: 'Vercel', level: 85, icon: <SiVercel className="text-black" /> },
            { name: 'Netlify', level: 80, icon: <SiNetlify className="text-teal-500" /> },
        ],
    },
];

export default function Skills() {
    const [activeTab, setActiveTab] = useState('frontend');

    const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

    return (
        <section id="skills" className="py-20 bg-emerald-50 dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.03),transparent_50%)]" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                            Skills & Expertise
                        </h2>
                    </div>

                    <div className="flex justify-center gap-2 mb-10">
                        {skillCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === category.id
                                    ? 'bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/25'
                                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                {category.icon}
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-6"
                            >
                                {activeCategory?.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{skill.icon}</span>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                                    {skill.name}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
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
                        ].map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
                            >
                                {tech.icon}
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}