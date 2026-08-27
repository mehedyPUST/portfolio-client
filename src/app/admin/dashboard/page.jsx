'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';

import { ArrowLeft, Edit, ExternalLink, FolderKanban, Layout, LogOut, Plus, Star, Trash2, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import EditHeroModal from '@/components/admin/EditHeroModal';
import EditAboutModal from '@/components/admin/EditAboutModal';
import AddProjectModal from '@/components/admin/AddProjectModal';
import EditProjectModal from '@/components/admin/EditProjectModal';
import ThemeToggle from '@/components/ThemeToggle';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AdminDashboard() {
    const { isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    const [heroModalOpen, setHeroModalOpen] = useState(false);
    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [editProjectOpen, setEditProjectOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [heroData, setHeroData] = useState(null);
    const [aboutData, setAboutData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchHero();
            fetchAbout();
            fetchProjects();
        }
    }, [isAuthenticated]);

    const fetchHero = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/hero`, { credentials: 'include' });
            setHeroData(await res.json());
        } catch { }
    };

    const fetchAbout = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/about`, { credentials: 'include' });
            setAboutData(await res.json());
        } catch { }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/projects`, { credentials: 'include' });
            setProjects(await res.json());
        } catch { }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        await fetch(`${BACKEND_URL}/api/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        fetchProjects();
    };

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFA] dark:bg-dark">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const tabs = [
        { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
        { id: 'hero', label: 'Hero', icon: Layout },
        { id: 'about', label: 'About', icon: User, count: aboutData?.paragraphs?.length || 0 },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFA] dark:bg-dark">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-40 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border-b border-gray-100 dark:border-dark-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-600 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 transition font-medium"
                        >
                            <ArrowLeft size={18} />
                            <span className="hidden sm:inline text-sm">View Site</span>
                        </Link>
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-border" />
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 leading-none mb-0.5">
                                Admin
                            </p>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-light leading-tight">
                                Dashboard
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-light-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Projects', value: projects.length, icon: FolderKanban, tint: 'from-primary-50 to-primary-100/50 dark:from-primary-500/10 dark:to-primary-500/5' },
                        { label: 'Featured', value: projects.filter((p) => p.featured).length, icon: Star, tint: 'from-amber-50 to-amber-100/40 dark:from-amber-500/10 dark:to-amber-500/5' },
                        { label: 'About paras', value: aboutData?.paragraphs?.length || 0, icon: User, tint: 'from-sky-50 to-sky-100/40 dark:from-sky-500/10 dark:to-sky-500/5' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.tint} p-5 shadow-sm`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-light-muted">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-light mt-1 tabular-nums">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 dark:bg-dark-surface/80 shadow-sm text-primary-600 dark:text-primary-400">
                                    <stat.icon size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 p-1.5 rounded-2xl bg-white dark:bg-dark-surface shadow-sm w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-gray-600 dark:text-light-muted hover:bg-gray-50 dark:hover:bg-dark-elevated'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {tab.count !== undefined && (
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                        activeTab === tab.id
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-100 dark:bg-dark-elevated text-gray-600 dark:text-light-muted'
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <div className="bg-gradient-to-br from-white via-gray-50/80 to-primary-50/40 dark:from-dark-surface dark:via-dark-surface dark:to-primary-900/10 rounded-2xl shadow-sm overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-100/80 dark:border-dark-border/60">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-light">All Projects</h2>
                                    <p className="text-sm text-gray-500 dark:text-light-muted mt-0.5">
                                        Manage your portfolio projects
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAddProjectOpen(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition shadow-lg shadow-primary-600/30"
                                >
                                    <Plus size={16} />
                                    Add Project
                                </button>
                            </div>

                            <div className="divide-y divide-gray-100/80 dark:divide-dark-border/50">
                                {projects.length === 0 ? (
                                    <div className="text-center py-16 px-4">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-500/10">
                                            <FolderKanban className="text-primary-500 dark:text-primary-400" size={28} />
                                        </div>
                                        <p className="text-gray-600 dark:text-light-muted font-medium">No projects yet</p>
                                        <p className="text-sm text-gray-400 dark:text-light-muted/70 mt-1">
                                            Create your first portfolio project
                                        </p>
                                        <button
                                            onClick={() => setAddProjectOpen(true)}
                                            className="mt-5 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition shadow-lg shadow-primary-500/30"
                                        >
                                            Create your first project
                                        </button>
                                    </div>
                                ) : (
                                    projects.map((project) => (
                                        <div
                                            key={project._id}
                                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-white/70 dark:hover:bg-dark-elevated/60 transition gap-4"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="relative shrink-0 w-20 h-14 overflow-hidden rounded-xl shadow-sm">
                                                    {project.image ? (
                                                        <Image
                                                            src={project.image}
                                                            alt={project.name}
                                                            fill
                                                            sizes="80px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-14 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-500/20 dark:to-dark-elevated flex items-center justify-center">
                                                            <span className="text-lg font-bold text-primary-500/60">
                                                                {(project.name || 'P').charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-semibold text-gray-900 dark:text-light truncate">
                                                            {project.name}
                                                        </h3>
                                                        {project.featured && (
                                                            <span className="flex-shrink-0 px-2 py-0.5 bg-primary-500 text-white text-[10px] rounded-full flex items-center gap-1 font-semibold shadow-sm shadow-primary-500/25">
                                                                <Star size={10} className="fill-white" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-light-muted mt-0.5 line-clamp-1">
                                                        {project.shortDescription ||
                                                            project.description
                                                                ?.replace(/<[^>]*>/g, '')
                                                                .replace(/\s+/g, ' ')
                                                                .trim()
                                                                .slice(0, 80) ||
                                                            'No description'}
                                                    </p>
                                                    {project.tech && (
                                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                                            {project.tech
                                                                .split(',')
                                                                .map((t) => t.trim())
                                                                .filter(Boolean)
                                                                .slice(0, 4)
                                                                .map((t) => (
                                                                    <span
                                                                        key={t}
                                                                        className="inline-flex items-center rounded-full bg-primary-50/90 dark:bg-primary-500/10 px-2 py-0.5 text-[10px] font-medium text-primary-700 dark:text-primary-400"
                                                                    >
                                                                        {t}
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-end sm:self-center">
                                                {project.live && project.live !== '#' && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg text-gray-500 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
                                                        title="Live demo"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                {project.github && project.github !== '#' && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg text-gray-500 dark:text-light-muted hover:text-gray-900 dark:hover:text-light hover:bg-gray-100 dark:hover:bg-dark-elevated transition"
                                                        title="GitHub"
                                                    >
                                                        <FaGithub size={16} />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedProject(project);
                                                        setEditProjectOpen(true);
                                                    }}
                                                    className="p-2 rounded-lg text-gray-500 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    className="p-2 rounded-lg text-gray-500 dark:text-light-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Hero Tab */}
                    {activeTab === 'hero' && (
                        <div className="bg-gradient-to-br from-white via-gray-50/80 to-primary-50/40 dark:from-dark-surface dark:via-dark-surface dark:to-primary-900/10 rounded-2xl shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-light">Hero Section</h2>
                                    <p className="text-sm text-gray-500 dark:text-light-muted mt-0.5">
                                        Your introduction and social links
                                    </p>
                                </div>
                                <button
                                    onClick={() => setHeroModalOpen(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition shadow-lg shadow-primary-500/30"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    { label: 'Name', value: heroData?.title || 'Not set' },
                                    { label: 'Designation', value: heroData?.subtitle || 'Not set' },
                                    { label: 'Description', value: heroData?.description || 'Not set' },
                                    { label: 'Resume Link', value: heroData?.resumeLink || 'Not set' },
                                    { label: 'GitHub', value: heroData?.github || 'Not set' },
                                    { label: 'LinkedIn', value: heroData?.linkedin || 'Not set' },
                                    { label: 'Facebook', value: heroData?.facebook || 'Not set' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-xl bg-white/70 dark:bg-dark-elevated/70 p-4 shadow-sm"
                                    >
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-light truncate">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="bg-gradient-to-br from-white via-gray-50/80 to-primary-50/40 dark:from-dark-surface dark:via-dark-surface dark:to-primary-900/10 rounded-2xl shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-light">About Section</h2>
                                    <p className="text-sm text-gray-500 dark:text-light-muted mt-0.5">
                                        {aboutData?.paragraphs?.length || 0} paragraph(s)
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAboutModalOpen(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition shadow-lg shadow-primary-500/30"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                            </div>
                            <div className="space-y-3">
                                {aboutData?.paragraphs?.map((para, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl bg-white/70 dark:bg-dark-elevated/70 p-4 shadow-sm"
                                    >
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1.5">
                                            Paragraph {i + 1}
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-light-muted leading-relaxed">
                                            {para}
                                        </p>
                                    </div>
                                ))}
                                {(!aboutData?.paragraphs || aboutData.paragraphs.length === 0) && (
                                    <p className="text-gray-500 dark:text-light-muted text-center py-10">
                                        No content yet. Click Edit to add.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modals */}
            {heroModalOpen && (
                <EditHeroModal
                    heroData={heroData}
                    onClose={() => setHeroModalOpen(false)}
                    onUpdate={() => {
                        fetchHero();
                        setHeroModalOpen(false);
                    }}
                />
            )}
            {aboutModalOpen && (
                <EditAboutModal
                    aboutData={aboutData}
                    onClose={() => setAboutModalOpen(false)}
                    onUpdate={() => {
                        fetchAbout();
                        setAboutModalOpen(false);
                    }}
                />
            )}
            {addProjectOpen && (
                <AddProjectModal
                    onClose={() => setAddProjectOpen(false)}
                    onAdd={() => {
                        fetchProjects();
                        setAddProjectOpen(false);
                    }}
                />
            )}
            {editProjectOpen && selectedProject && (
                <EditProjectModal
                    project={selectedProject}
                    onClose={() => {
                        setEditProjectOpen(false);
                        setSelectedProject(null);
                    }}
                    onUpdate={() => {
                        fetchProjects();
                        setEditProjectOpen(false);
                        setSelectedProject(null);
                    }}
                />
            )}
        </div>
    );
}
