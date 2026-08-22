'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project }) {
    const href = `/projects/${project._id || project.id}`;

    const techList = project.tech
        ? project.tech
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
            .slice(0, 5)
        : [];

    const hasLive = project.live && project.live !== '#';
    const hasGithub = project.github && project.github !== '#';

    const shortText =
        project.shortDescription?.trim() ||
        project.description?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 120) ||
        '';

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-dark-surface border border-gray-200/90 dark:border-dark-border overflow-hidden transition-all duration-300 hover:border-primary-400/50 dark:hover:border-primary-500/40 hover:shadow-[0_12px_40px_-12px_rgba(16,170,90,0.18)] dark:hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
        >
            {/* Image */}
            <Link
                href={href}
                className="relative block aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-dark-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
            >
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-gray-200/80 dark:bg-dark-border/60 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-400 dark:text-light-muted/50">
                                {(project.name || 'P').charAt(0)}
                            </span>
                        </div>
                    </div>
                )}

                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                {project.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-primary-700 dark:text-primary-400 shadow-sm border border-white/50 dark:border-dark-border">
                        <Star size={10} className="fill-primary-500 text-primary-500" />
                        Featured
                    </span>
                )}

                <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-dark-surface/90 text-gray-700 dark:text-light opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm border border-gray-200/60 dark:border-dark-border">
                    <ArrowUpRight size={14} strokeWidth={2.25} />
                </span>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex-1">
                    <Link href={href} className="block group/title focus:outline-none">
                        <h3 className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-light leading-snug line-clamp-2 group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors">
                            {project.name}
                        </h3>
                    </Link>

                    {shortText && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-light-muted line-clamp-2">
                            {shortText}
                        </p>
                    )}

                    {techList.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {techList.map((t) => (
                                <span
                                    key={t}
                                    className="inline-flex items-center rounded-md bg-gray-50 dark:bg-dark-elevated px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:text-light-muted border border-gray-100 dark:border-dark-border"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between gap-3">
                    <Link
                        href={href}
                        className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:underline"
                    >
                        View project
                        <ArrowUpRight size={14} className="opacity-70" />
                    </Link>

                    <div className="flex items-center gap-1">
                        {hasLive && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
                                title="Live demo"
                            >
                                Live
                                <ArrowUpRight size={12} />
                            </a>
                        )}
                        {hasGithub && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center justify-center rounded-lg p-1.5 text-gray-500 dark:text-light-muted hover:text-gray-900 dark:hover:text-light hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
                                aria-label="GitHub repository"
                                title="GitHub"
                            >
                                <FaGithub size={15} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}