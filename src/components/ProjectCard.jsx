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
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl border border-emerald-100 dark:border-gray-700 group flex flex-col"
        >
            {/* Project Screenshot */}
            <div className="relative h-48 w-full overflow-hidden bg-emerald-100 dark:bg-gray-700">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-emerald-400 dark:text-emerald-600">
                        <Eye size={48} />
                    </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-medium px-2.5 py-1 bg-amber-500 rounded-full">
                        {project.tech?.split(',')[0] || 'Project'}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-1.5 line-clamp-1">
                    {project.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 line-clamp-2 flex-1">
                    {project.description?.slice(0, 100)}
                    {project.description?.length > 100 ? '...' : ''}
                </p>

                {/* Action Buttons - compact */}
                <div className="flex items-center gap-1.5 mt-auto">
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