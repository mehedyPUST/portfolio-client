'use client';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Education() {
    return (
        <section id="education" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-12 text-center">
                        Education
                    </h2>
                    <div className="relative pl-8 border-l-2 border-amber-400 dark:border-amber-500 space-y-10">
                        <div className="relative">
                            <GraduationCap className="absolute -left-12 top-1 text-amber-500 bg-white dark:bg-gray-900 p-1 rounded-full" size={32} />
                            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">M.Sc in Physics</h3>
                            <p className="text-gray-600 dark:text-gray-400">Pabna University of Science & Technology</p>
                            <p className="text-sm text-amber-600 dark:text-amber-400 italic mt-1">Thesis: Solid State Physics</p>
                        </div>
                        <div className="relative">
                            <GraduationCap className="absolute -left-12 top-1 text-amber-500 bg-white dark:bg-gray-900 p-1 rounded-full" size={32} />
                            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">B.Sc in Physics</h3>
                            <p className="text-gray-600 dark:text-gray-400">Pabna University of Science & Technology</p>
                            <p className="text-sm text-amber-600 dark:text-amber-400 italic mt-1">Solid State Physics Focus</p>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-full font-medium">
                            🚀 Web Development Training: Programming Hero Bootcamp  (Batch 13)
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}