'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';  // or inline if you prefer

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const [active, setActive] = useState('hero');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );
        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            setMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-emerald-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <span className="text-2xl font-bold text-amber-400 tracking-tight">
                        &lt;MH/&gt;
                    </span>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {sections.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => handleClick(id)}
                                className={`relative px-2 py-1 text-sm font-medium transition-colors ${active === id
                                        ? 'text-amber-400'
                                        : 'text-emerald-50 dark:text-gray-300 hover:text-amber-300'
                                    }`}
                            >
                                {label}
                                {active === id && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile hamburger + toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            className="text-amber-400"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-emerald-900/95 dark:bg-gray-900/95 border-t border-emerald-700 dark:border-gray-700"
                    >
                        <div className="flex flex-col space-y-2 px-4 py-4">
                            {sections.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleClick(id)}
                                    className={`text-left px-3 py-2 rounded-md text-sm font-medium ${active === id
                                            ? 'text-amber-400 bg-emerald-800 dark:bg-gray-800'
                                            : 'text-emerald-50 dark:text-gray-300 hover:bg-emerald-800 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}