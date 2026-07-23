'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';


// Same data as in ProjectsSection (in a real app you would fetch this from an API)
const projects = [
    {
        id: 1,
        name: 'E‑Commerce Platform',
        image: '/project1.jpg',
        tech: 'Next.js, MongoDB, Stripe',
        description:
            'Full‑stack online store with cart, payment, and admin panel.',
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

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === Number(id));

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900">
                <p className="text-xl text-gray-700 dark:text-gray-300">
                    Project not found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 underline mb-6"
                >
                    <ArrowLeft size={18} /> Back to portfolio
                </Link>
                <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                    {project.name}
                </h1>
                <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                </p>
                <div className="mb-4">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Tech Stack:
                    </span>{' '}
                    {project.tech}
                </div>
                <div className="flex gap-4 mb-6">
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 underline"
                    >
                        <ExternalLink size={18} /> Live Site
                    </a>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 underline"
                    >
                        <FaGithub size={18} /> Client Repo
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                            Challenges
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {project.challenges}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                            Future Improvements
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {project.improvements}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}