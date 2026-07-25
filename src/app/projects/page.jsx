'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus, GripVertical, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SkeletonCard from '@/components/SkeletonCard';
import ProjectCard from '@/components/ProjectCard';
import AddProjectModal from '@/components/admin/AddProjectModal';
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

        // Save new order to backend
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
        <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
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
                    <div className="flex items-center gap-3">
                        {isAuthenticated && (
                            <>
                                <button
                                    onClick={toggleReorderMode}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${reorderMode
                                            ? 'bg-amber-500 text-gray-900'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
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
                                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition"
                                >
                                    <Plus size={18} /> Add Project
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Error state */}
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500 mb-4">Failed to load projects: {error}</p>
                        <button onClick={fetchProjects} className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg">
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

                {/* Projects grid with drag-and-drop */}
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
                                                            className="absolute top-3 left-3 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-grab active:cursor-grabbing"
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

                {/* Empty state */}
                {!loading && !error && projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No projects yet.</p>
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