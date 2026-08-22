'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Star, ExternalLink } from 'lucide-react';
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col h-full rounded-2xl bg-gradient-to-br from-white via-gray-50/90 to-primary-50/70 dark:from-dark-elevated dark:via-dark-surface dark:to-primary-900/15 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(16,170,90,0.25)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] transition-shadow duration-400"
        >
            {/* Soft glow ring on hover */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary-400/30 via-transparent to-primary-500/20" />

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
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 dark:from-dark-elevated dark:to-dark-border">
                        <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-dark-surface/80 flex items-center justify-center shadow-md">
                            <span className="text-2xl font-bold text-primary-500/70 dark:text-primary-400/60">
                                {(project.name || 'P').charAt(0)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

                {project.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary-500/95 text-white backdrop-blur-sm px-3 py-1 text-[11px] font-semibold shadow-lg shadow-primary-500/30">
                        <Star size={11} className="fill-white text-white" />
                        Featured
                    </span>
                )}

                {/* Hover arrow */}
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>

                {/* Live badge on image when available */}
                {hasLive && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:text-light opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500" />
                        </span>
                        Live demo
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex-1">
                    <Link href={href} className="block group/title focus:outline-none">
                        <h3 className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-light leading-snug line-clamp-2 group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors duration-200">
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
                                    className="inline-flex items-center rounded-full bg-primary-50/80 dark:bg-primary-500/10 px-2.5 py-1 text-[11px] font-medium text-primary-700 dark:text-primary-400 transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 flex items-center justify-between gap-3 border-t border-gray-100/80 dark:border-dark-border/60">
                    <Link
                        href={href}
                        className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:underline group/link"
                    >
                        View project
                        <ArrowUpRight
                            size={14}
                            className="opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                        />
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
                                <ExternalLink size={12} />
                                Live
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
