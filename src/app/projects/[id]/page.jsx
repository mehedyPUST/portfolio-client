'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/projects`);
                const projects = await res.json();

                const found = projects.find(
                    (p) => p._id === id || p.id === Number(id)
                );

                if (found) {
                    setProject(found);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900 px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                        Project not found.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Portfolio
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Project image */}
                    <div className="relative w-full h-64 md:h-96 bg-emerald-100 dark:bg-gray-700">
                        {project.image && !imgError ? (
                            <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                priority
                                loading="eager"
                                sizes="(max-width: 768px) 100vw, 896px"
                                className="object-cover"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <span className="text-emerald-400 dark:text-emerald-600 text-lg">No Image Available</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {project.name}
                            </h1>
                            <div className="flex items-center gap-2 text-emerald-200">
                                <Tag size={16} />
                                <span className="text-sm">{project.tech}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.live && project.live !== '#' && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    Live Demo
                                </a>
                            )}
                            {project.github && project.github !== '#' && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-xl transition-colors"
                                >
                                    <FaGithub size={16} />
                                    Client Repository
                                </a>
                            )}
                            {(!project.live || project.live === '#') && (!project.github || project.github === '#') && (
                                <p className="text-gray-500 dark:text-gray-400 italic">No links available</p>
                            )}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-3">
                                About This Project
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {project.description || 'No description provided.'}
                            </p>
                        </div>

                        {project.tech && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-3">
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.split(',').map((tech) => (
                                        <span
                                            key={tech.trim()}
                                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                <h3 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-3">
                                    ⚡ Challenges
                                </h3>
                                <p className="text-amber-700 dark:text-amber-400/80 leading-relaxed text-sm">
                                    {project.challenges || 'No challenges documented.'}
                                </p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                <h3 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                                    🚀 Future Improvements
                                </h3>
                                <p className="text-emerald-700 dark:text-emerald-400/80 leading-relaxed text-sm">
                                    {project.improvements || 'No improvements planned yet.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}