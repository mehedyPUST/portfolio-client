'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, Edit } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import EditProjectModal from '@/components/admin/EditProjectModal';

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
            <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900 px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Project not found.</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl">
                        <ArrowLeft size={18} /> Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-20 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 font-medium mb-8">
                        <ArrowLeft size={18} /> Back to Portfolio
                    </Link>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative w-full h-64 md:h-96 bg-emerald-100 dark:bg-gray-700">
                            {project.image ? (
                                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-emerald-400 text-lg">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
                                <div className="flex items-center gap-2 text-emerald-200">
                                    <Tag size={16} /> <span className="text-sm">{project.tech}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Buttons – professional outline style */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.live && project.live !== '#' && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-sm font-medium transition-colors"
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
                                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaGithub size={14} />
                                        Client Repository
                                    </a>
                                )}
                            </div>

                            {/* Description – full width, no extra padding */}
                            <div className="mb-8 -mx-8">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-3 px-8">About This Project</h2>
                                <div
                                    className="text-gray-600 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description || '<p>No description provided.</p>' }}
                                />
                            </div>

                            {project.tech && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-3">Tech Stack</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.split(',').map((t) => (
                                            <span key={t.trim()} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">{t.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Challenges – zero inner padding, only card border */}
                            <div className="mb-6">
                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                    <h3 className="font-bold text-amber-800 dark:text-amber-300 text-lg pt-6 px-6 pb-0">⚡ Challenges</h3>
                                    <div
                                        className="text-amber-700 dark:text-amber-400/80 prose prose-sm dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: project.challenges || '<p>None documented.</p>' }}
                                    />
                                </div>
                            </div>

                            {/* Improvements – zero inner padding */}
                            <div>
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                    <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-lg pt-6 px-6 pb-0">🚀 Future Improvements</h3>
                                    <div
                                        className="text-emerald-700 dark:text-emerald-400/80 prose prose-sm dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: project.improvements || '<p>None planned.</p>' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Edit Button – only for admin */}
            {isAuthenticated && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditModal(true)}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-full shadow-2xl shadow-amber-500/30 transition"
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