'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Edit, AlertCircle, RefreshCw } from 'lucide-react';
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

            // Support multiple response formats
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
            className="py-24 bg-white dark:bg-dark-surface relative scroll-mt-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4">
                {/* ===== MOBILE ===== */}
                <div className="md:hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Featured Projects
                        </h2>
                        <div className="w-12 h-1 bg-primary-500 rounded-full mt-3" />
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                            A selection of recent work that reflects my approach to building modern web applications.
                        </p>
                    </motion.div>

                    <div className="space-y-5">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        ) : error ? (
                            <div className="text-center py-12 bg-primary-50 dark:bg-dark-elevated rounded-2xl border border-gray-200 dark:border-dark-border/50">
                                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                                <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                                    Could not load projects
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                                <button
                                    onClick={fetchProjects}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg"
                                >
                                    <RefreshCw size={14} /> Try Again
                                </button>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-12 bg-primary-50 dark:bg-dark-elevated rounded-2xl">
                                <p className="text-gray-700 dark:text-gray-300">No featured projects yet</p>
                            </div>
                        ) : (
                            projects.map((project) => (
                                <ProjectCard key={project._id || project.id} project={project} />
                            ))
                        )}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25"
                        >
                            See More Projects
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>

                {/* ===== DESKTOP ===== */}
                <div className="hidden md:flex flex-row items-stretch justify-center">
                    {/* Left */}
                    <div className="w-2/5 flex flex-col justify-center space-y-6 pr-12 py-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Featured Projects
                            </h2>
                            <div className="w-12 h-1 bg-primary-500 rounded-full mt-4" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            A selection of recent work that reflects my approach to building modern, performant web applications.
                        </p>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2.5 w-fit px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:scale-[1.02] transition-all"
                        >
                            See More Projects
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    {/* Separator */}
                    <div className="w-1.5 min-h-[380px] bg-gradient-to-b from-primary-500 via-primary-400/50 to-primary-500/10 rounded-full mx-8 self-stretch" />

                    {/* Right */}
                    <div className="w-3/5 flex flex-col justify-center space-y-6 pl-4 py-4">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        ) : error ? (
                            <div className="text-center py-16 bg-primary-50 dark:bg-dark-elevated rounded-2xl border">
                                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                                <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                                    Could not load projects
                                </p>
                                <p className="text-sm text-gray-500 mb-4">{error}</p>
                                <button
                                    onClick={fetchProjects}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg"
                                >
                                    <RefreshCw size={14} /> Try Again
                                </button>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-16 bg-primary-50 dark:bg-dark-elevated rounded-2xl">
                                <p className="text-gray-700 dark:text-gray-300">No featured projects yet</p>
                            </div>
                        ) : (
                            projects.map((project) => (
                                <ProjectCard key={project._id || project.id} project={project} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {isAuthenticated && (
                <Link
                    href="/admin/dashboard"
                    className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium shadow-lg"
                >
                    <Edit size={14} />
                    Dashboard
                </Link>
            )}
        </section>
    );
}