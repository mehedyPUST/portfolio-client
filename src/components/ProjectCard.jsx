'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Eye, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project }) {
    const techList = project.tech
        ? project.tech.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 4)
        : [];

    const hasLive = project.live && project.live !== '#';
    const hasGithub = project.github && project.github !== '#';
    const short =
        project.shortDescription ||
        project.description?.replace(/<[^>]*>/g, '').slice(0, 110) ||
        '';

    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/80 dark:border-dark-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-300/40 dark:hover:border-primary-500/30 transition-all duration-300 flex flex-col"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-dark-elevated">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 dark:text-dark-border">
                        <Eye size={40} strokeWidth={1.25} />
                    </div>
                )}

                {project.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-500 text-white text-xs font-semibold shadow-md">
                        <Star size={11} className="fill-current" /> Featured
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-light tracking-tight line-clamp-1">
                    {project.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-light-muted leading-relaxed line-clamp-2 flex-1">
                    {short}
                </p>

                {/* Tech chips */}
                {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {techList.map((t) => (
                            <span
                                key={t}
                                className="px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-[11px] font-medium border border-primary-100 dark:border-primary-500/20"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 mt-auto">
                    <Link
                        href={`/projects/${project._id || project.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold rounded-xl transition shadow-sm shadow-primary-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                    >
                        <Eye size={13} /> Details
                    </Link>

                    {hasLive && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border text-gray-700 dark:text-light text-xs font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                        >
                            <ExternalLink size={13} /> Live
                        </a>
                    )}

                    {hasGithub && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border text-gray-700 dark:text-light rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                            aria-label="GitHub"
                        >
                            <FaGithub size={14} />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}