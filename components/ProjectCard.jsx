'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl border border-emerald-100 dark:border-gray-700"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                    {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description.slice(0, 80)}...
                </p>
                <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-amber-500 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition"
                >
                    View Details →
                </Link>
            </div>
        </motion.div>
    );
}