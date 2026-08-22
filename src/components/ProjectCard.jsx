'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl border border-gray-200 dark:border-dark-border group flex flex-col"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-dark-elevated">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 dark:text-dark-border">
                        <Eye size={48} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-medium px-2.5 py-1 bg-primary-500 rounded-full shadow-lg">
                        {project.tech?.split(',')[0] || 'Project'}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-1">
                    {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-1 leading-relaxed">
                    {project.shortDescription || project.description?.replace(/<[^>]*>/g, '').slice(0, 100)}
                </p>

                <div className="flex items-center gap-2 mt-auto flex-wrap">
                    {project.live && project.live !== '#' && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-500/30 text-xs font-medium rounded-md transition-colors"
                        >
                            <ExternalLink size={12} /> Live
                        </a>
                    )}
                    {project.github && project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-elevated text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border text-xs font-medium rounded-md transition-colors"
                        >
                            <FaGithub size={12} /> Repo
                        </a>
                    )}
                    <Link
                        href={`/projects/${project._id || project.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-medium rounded-md transition-colors ml-auto shadow-sm hover:shadow-md"
                    >
                        <Eye size={12} /> Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}