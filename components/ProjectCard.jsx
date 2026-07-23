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
                    <span className="text-white text-sm font-medium px-3 py-1 bg-amber-500 rounded-full">
                        {project.tech?.split(',')[0] || 'Project'}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 line-clamp-1">
                    {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {project.description?.slice(0, 100)}
                    {project.description?.length > 100 ? '...' : ''}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex gap-2">
                        <a
                            href={project.live || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <ExternalLink size={14} /> Live
                        </a>
                        <a
                            href={project.github || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <FaGithub size={14} /> Repo
                        </a>
                    </div>
                    <Link
                        href={`/projects/${project._id || project.id}`}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-lg transition-colors text-sm"
                    >
                        <Eye size={14} /> View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}