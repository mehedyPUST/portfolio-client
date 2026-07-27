'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SkeletonCard from './SkeletonCard';
import ProjectCard from './ProjectCard';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProjectsSection() {
    const { isAuthenticated } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/projects/featured`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section id="projects" className="py-20 bg-emerald-50 dark:bg-gray-800 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                        Featured Projects
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        : projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                </div>

                {/* See More button */}
                <div className="text-center mt-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl transition shadow-lg"
                    >
                        See More Projects
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Admin dashboard link */}
                {isAuthenticated && (
                    <Link
                        href="/admin/dashboard"
                        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-lg text-sm transition"
                    >
                        <Edit size={14} /> Dashboard
                    </Link>
                )}
            </div>
        </section>
    );
}