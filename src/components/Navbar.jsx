'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';



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
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 120;
            const sectionElements = sections
                .map(({ id }) => document.getElementById(id))
                .filter(Boolean);

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el.offsetTop <= scrollPos) {
                    setActive(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (id) => {
        setActive(id);
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-emerald-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
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

                        {/* Admin button */}
                        <Link
                            href={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
                        >
                            <Shield size={14} />
                            {isAuthenticated ? 'Dashboard' : 'Admin'}
                        </Link>

                        <ThemeToggle />
                    </div>

                    {/* Mobile hamburger + admin + toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            href={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border border-amber-400/50 text-amber-400"
                        >
                            <Shield size={12} />
                            {isAuthenticated ? 'Dashboard' : 'Admin'}
                        </Link>
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