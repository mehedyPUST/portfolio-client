'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Plus } from 'lucide-react';
import SkeletonCard from '../../../components/SkeletonCard';
import ProjectCard from '../../../components/ProjectCard';
import AddProjectModal from '../../../components/admin/AddProjectModal';




const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AllProjects() {
    const { isAuthenticated } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${BACKEND_URL}/api/projects`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 font-medium mb-4 transition"
                        >
                            <ArrowLeft size={18} /> Back to Portfolio
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                            All Projects
                        </h1>
                    </div>
                    {isAuthenticated && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition"
                        >
                            <Plus size={18} /> Add Project
                        </button>
                    )}
                </div>

                {/* Error state */}
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500 mb-4">Failed to load projects: {error}</p>
                        <button
                            onClick={fetchProjects}
                            className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Projects grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No projects yet.
                        </p>
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg"
                            >
                                Add Your First Project
                            </button>
                        )}
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddProjectModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={() => {
                        fetchProjects();
                        setShowAddModal(false);
                    }}
                />
            )}
        </div>
    );
}