'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    Edit,
    Layers,
    Zap,
    Rocket,
    Star,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '@/context/AuthContext';
import EditProjectModal from '@/components/admin/EditProjectModal';
import ThemeToggle from '@/components/ThemeToggle';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const markdownComponents = {
    p: ({ children }) => (
        <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-gray-900 dark:text-light">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:opacity-80 transition"
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-outside ml-5 space-y-1.5 mb-3 last:mb-0">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-outside ml-5 space-y-1.5 mb-3 last:mb-0">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    h1: ({ children }) => (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-light mt-4 mb-2 first:mt-0">
            {children}
        </h3>
    ),
    h2: ({ children }) => (
        <h3 className="text-base font-semibold text-gray-900 dark:text-light mt-4 mb-2 first:mt-0">
            {children}
        </h3>
    ),
    h3: ({ children }) => (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-light mt-3 mb-1.5 first:mt-0">
            {children}
        </h4>
    ),
    code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-dark-elevated text-[0.85em] font-mono text-primary-700 dark:text-primary-400">
            {children}
        </code>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-primary-400 pl-4 italic text-gray-500 dark:text-light-muted my-3">
            {children}
        </blockquote>
    ),
};

function MarkdownContent({ content, fallback }) {
    if (!content || !content.trim()) {
        return <p className="text-gray-400 dark:text-light-muted italic">{fallback}</p>;
    }
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
        </ReactMarkdown>
    );
}

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
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFA] dark:bg-dark">
                <div className="w-11 h-11 border-[3px] border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-[#F8FAFA] dark:bg-dark">
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-dark-border">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary-600 dark:text-primary-400 tracking-tight"
                        >
                            &lt;MH/&gt;
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="flex items-center justify-center min-h-screen pt-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-md"
                    >
                        <p className="text-7xl font-bold text-primary-500/20 dark:text-primary-400/20 mb-2">
                            404
                        </p>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-light mb-2">
                            Project not found
                        </h1>
                        <p className="text-gray-500 dark:text-light-muted mb-8 text-sm">
                            This project doesn&apos;t exist or may have been removed.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-600/25 transition"
                        >
                            <ArrowLeft size={16} /> Back to Portfolio
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    const techList = project.tech
        ? project.tech.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    const hasLive = project.live && project.live !== '#';
    const hasGithub = project.github && project.github !== '#';
    const hasBackend = project.backendGithub && project.backendGithub !== '#';

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFA] dark:bg-dark">
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-dark-border">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary-600 dark:text-primary-400 tracking-tight"
                        >
                            &lt;MH/&gt;
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>

                <main className="pt-24 pb-20 px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 transition mb-8 group"
                        >
                            <ArrowLeft
                                size={16}
                                className="group-hover:-translate-x-0.5 transition-transform"
                            />
                            Back to Projects
                        </Link>

                        <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-dark-border shadow-xl shadow-gray-200/50 dark:shadow-none mb-8 bg-gray-100 dark:bg-dark-elevated">
                            <div className="aspect-[16/9] sm:aspect-[2/1] relative">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 dark:text-dark-border">
                                        <Layers size={48} strokeWidth={1.25} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {project.featured && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-500/90 text-white text-xs font-semibold backdrop-blur-sm">
                                                <Star size={11} className="fill-current" /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                                        {project.name}
                                    </h1>
                                    {project.shortDescription && (
                                        <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl line-clamp-2">
                                            {project.shortDescription}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 mb-10">
                            {hasLive && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-600/20 transition"
                                >
                                    <ExternalLink size={15} />
                                    Live Demo
                                </a>
                            )}
                            {hasGithub && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-light text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-dark-elevated transition"
                                >
                                    <FaGithub size={15} />
                                    Frontend
                                </a>
                            )}
                            {hasBackend && (
                                <a
                                    href={project.backendGithub}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-light text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-dark-elevated transition"
                                >
                                    <FaGithub size={15} />
                                    Backend
                                </a>
                            )}
                        </div>

                        <div className="space-y-8">
                            <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/80 dark:border-dark-border p-6 sm:p-8 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-light mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full bg-primary-500" />
                                    About This Project
                                </h2>
                                <div className="text-gray-600 dark:text-light-muted text-[15px]">
                                    <MarkdownContent
                                        content={project.description}
                                        fallback="No description provided."
                                    />
                                </div>
                            </section>

                            {techList.length > 0 && (
                                <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/80 dark:border-dark-border p-6 sm:p-8 shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-light mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 rounded-full bg-primary-500" />
                                        Tech Stack
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {techList.map((t) => (
                                            <span
                                                key={t}
                                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-sm font-medium border border-primary-100 dark:border-primary-500/20"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/80 dark:border-dark-border p-6 shadow-sm">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-light mb-3 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                                            <Zap size={15} className="text-amber-600 dark:text-amber-400" />
                                        </div>
                                        Challenges
                                    </h3>
                                    <div className="text-sm text-gray-600 dark:text-light-muted">
                                        <MarkdownContent
                                            content={project.challenges}
                                            fallback="None documented."
                                        />
                                    </div>
                                </section>

                                <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/80 dark:border-dark-border p-6 shadow-sm">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-light mb-3 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                                            <Rocket size={15} className="text-primary-600 dark:text-primary-400" />
                                        </div>
                                        Future Improvements
                                    </h3>
                                    <div className="text-sm text-gray-600 dark:text-light-muted">
                                        <MarkdownContent
                                            content={project.improvements}
                                            fallback="None planned."
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>

            {isAuthenticated && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowEditModal(true)}
                    className="fixed bottom-7 right-7 z-50 flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-full shadow-xl shadow-primary-600/30 transition"
                >
                    <Edit size={15} /> Edit Project
                </motion.button>
            )}

            {showEditModal && (
                <EditProjectModal
                    project={project}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={() => {
                        fetchProject();
                        setShowEditModal(false);
                    }}
                />
            )}
        </>
    );
}