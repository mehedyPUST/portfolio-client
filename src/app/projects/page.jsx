'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus, GripVertical, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SkeletonCard from '@/components/SkeletonCard';
import ProjectCard from '@/components/ProjectCard';
import AddProjectModal from '@/components/admin/AddProjectModal';
import ThemeToggle from '@/components/ThemeToggle';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AllProjects() {
    const { isAuthenticated } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [reorderMode, setReorderMode] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BACKEND_URL}/api/projects`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(projects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProjects(items);

        const orderedIds = items.map((p) => p._id);
        try {
            await fetch(`${BACKEND_URL}/api/projects/reorder`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderedIds }),
            });
        } catch (err) {
            console.error('Failed to save order', err);
        }
    };

    const toggleReorderMode = () => {
        setReorderMode(!reorderMode);
    };

    return (
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

            <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
                <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mb-4 transition"
                        >
                            <ArrowLeft size={18} /> Back to Portfolio
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                            All Projects
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {isAuthenticated && (
                            <>
                                <button
                                    onClick={toggleReorderMode}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${reorderMode
                                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                            : 'bg-gray-200 dark:bg-dark-elevated text-gray-700 dark:text-light-muted hover:bg-gray-300 dark:hover:bg-dark-border'
                                        }`}
                                >
                                    {reorderMode ? (
                                        <>
                                            <Check size={16} /> Done Reordering
                                        </>
                                    ) : (
                                        <>
                                            <GripVertical size={16} /> Reorder
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition shadow-lg shadow-primary-600/30"
                                >
                                    <Plus size={18} /> Add Project
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500 mb-4">Failed to load projects: {error}</p>
                        <button onClick={fetchProjects} className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-lg shadow-primary-500/30">
                            Retry
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {!loading && !error && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="projects" direction="horizontal" isDropDisabled={!reorderMode}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {projects.map((project, index) => (
                                        <Draggable
                                            key={project._id}
                                            draggableId={project._id}
                                            index={index}
                                            isDragDisabled={!reorderMode}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`relative ${snapshot.isDragging ? 'z-50' : ''}`}
                                                >
                                                    {reorderMode && (
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="absolute top-3 left-3 z-10 p-2 bg-white dark:bg-dark-surface rounded-lg shadow-md cursor-grab active:cursor-grabbing border border-gray-200 dark:border-dark-border"
                                                        >
                                                            <GripVertical size={16} className="text-gray-500" />
                                                        </div>
                                                    )}
                                                    <ProjectCard project={project} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-light-muted text-lg mb-4">No projects yet.</p>
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-lg shadow-primary-500/30"
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