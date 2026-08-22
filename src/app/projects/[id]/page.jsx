'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, Edit } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import EditProjectModal from '@/components/admin/EditProjectModal';
import ThemeToggle from '@/components/ThemeToggle';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProjectDetail() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchProject = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/projects`);
            const projects = await res.json();
            const found = projects.find((p) => p._id === id || p.id === Number(id));
            if (found) setProject(found);
            else setError(true);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-light-bg dark:bg-dark px-4">
                {/* Navbar with Theme Toggle */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-dark-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-primary-500 tracking-tight">
                            &lt;MH/&gt;
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="flex items-center justify-center min-h-screen pt-16">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
                        <p className="text-gray-600 dark:text-light-muted mb-8">Project not found.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30">
                            <ArrowLeft size={18} /> Back to Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-light-bg dark:bg-dark">
                {/* Navbar with Theme Toggle */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-dark-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-primary-500 tracking-tight">
                            &lt;MH/&gt;
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="pt-20 px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mb-8 transition">
                            <ArrowLeft size={18} /> Back to Projects
                        </Link>

                        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-dark-border">
                            <div className="relative w-full h-64 md:h-96 bg-gray-100 dark:bg-dark-elevated">
                                {project.image ? (
                                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 dark:text-dark-border text-lg">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
                                    <div className="flex items-center gap-2 text-primary-300">
                                        <Tag size={16} /> <span className="text-sm">{project.tech}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.live && project.live !== '#' && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-400 bg-white dark:bg-dark-surface hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github && project.github !== '#' && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-light-muted bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <FaGithub size={14} />
                                            Client Repository
                                        </a>
                                    )}
                                </div>

                                <div className="mb-8 -mx-8">
                                    <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3 px-8">
                                        About This Project
                                    </h2>
                                    <div
                                        className="text-gray-700 dark:text-light leading-relaxed max-w-none px-8"
                                        dangerouslySetInnerHTML={{ __html: project.description || '<p>No description provided.</p>' }}
                                    />
                                </div>

                                {project.tech && (
                                    <div className="mb-8">
                                        <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">Tech Stack</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.split(',').map((t) => (
                                                <span key={t.trim()} className="px-3 py-1 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">{t.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50 overflow-hidden">
                                        <h3 className="font-bold text-amber-800 dark:text-amber-300 text-lg pt-6 px-6 pb-0">
                                            ⚡ Challenges
                                        </h3>
                                        <div
                                            className="text-amber-700 dark:text-amber-400/80 leading-relaxed px-6 pb-6"
                                            dangerouslySetInnerHTML={{ __html: project.challenges || '<p>None documented.</p>' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-200 dark:border-primary-800/50 overflow-hidden">
                                        <h3 className="font-bold text-primary-700 dark:text-primary-400 text-lg pt-6 px-6 pb-0">
                                            🚀 Future Improvements
                                        </h3>
                                        <div
                                            className="text-primary-700 dark:text-primary-400/80 leading-relaxed px-6 pb-6"
                                            dangerouslySetInnerHTML={{ __html: project.improvements || '<p>None planned.</p>' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {isAuthenticated && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditModal(true)}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full shadow-2xl shadow-primary-500/30 transition"
                >
                    <Edit size={16} /> Edit Project
                </motion.button>
            )}

            {showEditModal && (
                <EditProjectModal project={project} onClose={() => setShowEditModal(false)} onUpdate={() => { fetchProject(); setShowEditModal(false); }} />
            )}
        </>
    );
}