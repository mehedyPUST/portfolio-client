'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Eye, } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const titleColors = [
    'text-emerald-700 dark:text-emerald-300',
    'text-amber-700 dark:text-amber-300',
    'text-blue-700 dark:text-blue-300',
    'text-purple-700 dark:text-purple-300',
    'text-rose-700 dark:text-rose-300',
];

export default function ProjectCard({ project, index = 0 }) {
    const colorClass = titleColors[index % titleColors.length];

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
            {/* Image Section */}
            <div className="px-5 pt-5">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-gray-600">
                            <Eye size={40} />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

                    {project.tech && (
                        <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 text-[11px] font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full shadow-sm">
                                {project.tech.split(',')[0].trim()}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className={`text-base font-semibold mb-1.5 line-clamp-1 tracking-tight ${colorClass}`}>
                    {project.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {project.description?.slice(0, 120)}
                    {project.description?.length > 120 ? '...' : ''}
                </p>

                <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                    {project.live && project.live !== '#' && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 text-xs font-medium rounded-md transition-colors"
                        >
                            <ExternalLink size={12} /> Live
                        </a>
                    )}
                    {project.github && project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium rounded-md transition-colors"
                        >
                            <FaGithub size={12} /> Repo
                        </a>
                    )}
                    <Link
                        href={`/projects/${project._id || project.id}`}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-xs font-medium rounded-md transition-colors ml-auto"
                    >
                        <Eye size={12} /> Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}