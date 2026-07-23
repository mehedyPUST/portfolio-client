'use client';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-8 text-center">
                        About Me
                    </h2>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        <p>
                            I’m <span className="font-semibold text-emerald-700 dark:text-emerald-400">Mehedy Hasan</span>, a full‑stack developer
                            with an MSc in Physics from Pabna University of Science & Technology. My academic background in
                            Solid State Physics sharpened my analytical thinking, which I now channel into crafting efficient
                            web applications.
                        </p>
                        <p>
                            My programming journey started during my university days, and I later solidified my skills at the{' '}
                            <span className="text-amber-600 font-medium">Programming Hero Bootcamp (Batch 13)</span>.
                            Since then, I’ve been building responsive, full‑stack projects using the modern JavaScript ecosystem:
                            React, Next.js, Node.js, Express, and MongoDB.
                        </p>
                        <p>
                            Outside coding, you’ll find me exploring science documentaries, playing chess, or reading about
                            quantum mechanics. I believe great software comes from clarity, simplicity, and a deep understanding
                            of the problem — a mindset I inherited from my physics research.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}