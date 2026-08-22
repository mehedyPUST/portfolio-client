'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Edit, AlertCircle, RefreshCw, FolderKanban } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SkeletonCard from './SkeletonCard';
import ProjectCard from './ProjectCard';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProjectsSection() {
    const { isAuthenticated } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        if (!BACKEND_URL) {
            setError('NEXT_PUBLIC_BACKEND_URL is missing in .env.local');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/projects/featured`, {
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();

            const list = Array.isArray(data)
                ? data
                : Array.isArray(data?.projects)
                    ? data.projects
                    : Array.isArray(data?.data)
                        ? data.data
                        : [];

            setProjects(list);
        } catch (err) {
            console.error('Projects fetch error:', err);
            setError(err.message || 'Failed to load projects');
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section
            id="projects"
            className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 bg-[#F8FAFA] dark:bg-dark border-y border-gray-100 dark:border-dark-border"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 right-0 w-72 h-72 bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12"
                >
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
                            Portfolio
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-light">
                            Featured Projects
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-light-muted leading-relaxed">
                            A selection of recent work that reflects how I design and ship modern web applications.
                        </p>
                    </div>

                    <Link
                        href="/projects"
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold shadow-md shadow-primary-600/20 transition shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                    >
                        View all
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-200/70 dark:border-red-900/40 bg-white dark:bg-dark-surface px-6 py-14 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-light mb-1">
                            Could not load projects
                        </p>
                        <p className="text-sm text-gray-500 dark:text-light-muted mb-5 max-w-md mx-auto">
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={fetchProjects}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl transition"
                        >
                            <RefreshCw size={14} /> Try again
                        </button>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-500/10">
                            <FolderKanban className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-light mb-1">
                            No featured projects yet
                        </p>
                        <p className="text-sm text-gray-500 dark:text-light-muted">
                            Featured projects will appear here once they are published.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id || project.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
                                className="h-full"
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="mt-10 sm:mt-12 flex justify-center sm:hidden">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold shadow-md shadow-primary-600/20 transition"
                        >
                            See more projects
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>

            {isAuthenticated && (
                <Link
                    href="/admin/dashboard"
                    className="absolute top-5 right-4 sm:top-6 sm:right-6 z-10 inline-flex items-center gap-2 px-3.5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-primary-600/25 transition"
                >
                    <Edit size={14} />
                    Dashboard
                </Link>
            )}
        </section>
    );
}