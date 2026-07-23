'use client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const skillData = [
    { name: 'React / Next.js', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { name: 'Framer Motion', level: 75, category: 'Frontend' },
    { name: 'Node.js / Express', level: 85, category: 'Backend' },
    { name: 'MongoDB', level: 78, category: 'Backend' },
    { name: 'JWT / Auth', level: 80, category: 'Backend' },
    { name: 'Nodemailer', level: 70, category: 'Backend' },
    { name: 'Git / GitHub', level: 85, category: 'Tools' },
    { name: 'Vercel / Deploy', level: 82, category: 'Tools' },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-emerald-50 dark:bg-gray-800">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-12 text-center">
                        Skills
                    </h2>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={skillData} layout="vertical" margin={{ left: 80 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#10b981' }} />
                                <YAxis dataKey="name" type="category" tick={{ fill: '#10b981' }} width={120} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #f59e0b', color: '#f1f5f9' }}
                                    formatter={(value) => `${value}%`}
                                />
                                <Bar dataKey="level" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}