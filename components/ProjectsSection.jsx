'use client';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';

// Replace with your own project data (or fetch from an API)
const projects = [
    {
        id: 1,
        name: 'E‑Commerce Platform',
        image: '/project1.jpg',
        tech: 'Next.js, MongoDB, Stripe',
        description: 'Full‑stack online store with cart, payment, and admin panel.',
        live: 'https://your-live-link.com',
        github: 'https://github.com/yourgithub/ecommerce-client',
        challenges:
            'Implementing real‑time stock management and secure payment flow.',
        improvements: 'Add AI product recommendations, improve SEO.',
    },
    {
        id: 2,
        name: 'Task Manager API',
        image: '/project2.jpg',
        tech: 'Express, MongoDB, JWT',
        description:
            'RESTful API for task management with authentication and role‑based access.',
        live: 'https://api-demo.example.com',
        github: 'https://github.com/yourgithub/task-manager-api',
        challenges:
            'JWT refresh token rotation, request validation and rate limiting.',
        improvements: 'Add GraphQL interface, improve error logging.',
    },
    {
        id: 3,
        name: 'Portfolio Website',
        image: '/project3.jpg',
        tech: 'Next.js, Framer Motion, Nodemailer',
        description:
            'The very portfolio you are viewing – built with modern animations and dark mode.',
        live: '#',
        github: 'https://github.com/yourgithub/portfolio',
        challenges:
            'Custom cursor performance and scroll‑based animation sync.',
        improvements: 'Add blog section, integrate CMS, add dark mode toggle.',
    },
];

export default function ProjectsSection() {
    const [loading, setLoading] = useState(true);

    // Simulate a short loading time (remove if you fetch real data)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="projects" className="py-20 bg-emerald-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-12 text-center">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        : projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                </div>
            </div>
        </section>
    );
}