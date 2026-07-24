'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Link from 'next/link';

import { ArrowLeft, Edit, ExternalLink, FolderKanban, Layout, LogOut, Plus, Star, Trash2, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import EditHeroModal from '@/components/admin/EditHeroModal';
import EditAboutModal from '@/components/admin/EditAboutModal';
import AddProjectModal from '@/components/admin/AddProjectModal';
import EditProjectModal from '@/components/admin/EditProjectModal';


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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-500 hover:text-amber-500 transition"
                        >
                            <ArrowLeft size={18} />
                            <span className="hidden sm:inline text-sm">View Site</span>
                        </Link>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                            Dashboard
                        </h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition text-sm font-medium"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Projects', value: projects.length, icon: FolderKanban, color: 'bg-emerald-500' },
                        { label: 'Featured', value: projects.filter(p => p.featured).length, icon: Star, color: 'bg-amber-500' },
                        { label: 'About Paras', value: aboutData?.paragraphs?.length || 0, icon: User, color: 'bg-blue-500' },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="text-white" size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tab navigation */}
                <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/25'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                    ? 'bg-gray-900/20 text-gray-900'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}>
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
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">All Projects</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your portfolio projects</p>
                                </div>
                                <button
                                    onClick={() => setAddProjectOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition shadow-lg shadow-emerald-500/25"
                                >
                                    <Plus size={16} />
                                    Add Project
                                </button>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {projects.length === 0 ? (
                                    <div className="text-center py-16">
                                        <FolderKanban className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={48} />
                                        <p className="text-gray-500 dark:text-gray-400">No projects yet</p>
                                        <button
                                            onClick={() => setAddProjectOpen(true)}
                                            className="mt-4 px-4 py-2 bg-amber-500 text-gray-900 rounded-xl text-sm font-medium"
                                        >
                                            Create your first project
                                        </button>
                                    </div>
                                ) : (
                                    projects.map((project) => (
                                        <div
                                            key={project._id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                                                            {project.name}
                                                        </h3>
                                                        {project.featured && (
                                                            <span className="flex-shrink-0 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full flex items-center gap-1">
                                                                <Star size={10} /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{project.tech}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        {project.live && project.live !== '#' && (
                                                            <a href={project.live} target="_blank" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                                                                <ExternalLink size={10} /> Live
                                                            </a>
                                                        )}
                                                        {project.github && project.github !== '#' && (
                                                            <a href={project.github} target="_blank" className="text-xs text-gray-600 dark:text-gray-400 hover:underline flex items-center gap-1">
                                                                <FaGithub size={10} /> Repo
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => { setSelectedProject(project); setEditProjectOpen(true); }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
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
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Hero Section</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Your introduction and social links</p>
                                </div>
                                <button
                                    onClick={() => setHeroModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-medium rounded-xl transition"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Name', value: heroData?.title || 'Not set' },
                                    { label: 'Designation', value: heroData?.subtitle || 'Not set' },
                                    { label: 'Description', value: heroData?.description || 'Not set' },
                                    { label: 'Resume Link', value: heroData?.resumeLink || 'Not set' },
                                    { label: 'GitHub', value: heroData?.github || 'Not set' },
                                    { label: 'LinkedIn', value: heroData?.linkedin || 'Not set' },
                                    { label: 'Facebook', value: heroData?.facebook || 'Not set' },
                                ].map((item) => (
                                    <div key={item.label} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">About Section</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {aboutData?.paragraphs?.length || 0} paragraph(s)
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAboutModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-medium rounded-xl transition"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                            </div>
                            <div className="space-y-3">
                                {aboutData?.paragraphs?.map((para, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Paragraph {i + 1}</p>
                                        <p className="text-sm text-gray-800 dark:text-white">{para}</p>
                                    </div>
                                ))}
                                {(!aboutData?.paragraphs || aboutData.paragraphs.length === 0) && (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No content yet. Click Edit to add.</p>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modals */}
            {heroModalOpen && (
                <EditHeroModal heroData={heroData} onClose={() => setHeroModalOpen(false)} onUpdate={() => { fetchHero(); setHeroModalOpen(false); }} />
            )}
            {aboutModalOpen && (
                <EditAboutModal aboutData={aboutData} onClose={() => setAboutModalOpen(false)} onUpdate={() => { fetchAbout(); setAboutModalOpen(false); }} />
            )}
            {addProjectOpen && (
                <AddProjectModal onClose={() => setAddProjectOpen(false)} onAdd={() => { fetchProjects(); setAddProjectOpen(false); }} />
            )}
            {editProjectOpen && selectedProject && (
                <EditProjectModal project={selectedProject} onClose={() => { setEditProjectOpen(false); setSelectedProject(null); }} onUpdate={() => { fetchProjects(); setEditProjectOpen(false); setSelectedProject(null); }} />
            )}
        </div>
    );
}