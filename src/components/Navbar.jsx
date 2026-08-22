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
    const [scrolled, setScrolled] = useState(false);
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
            setScrolled(window.scrollY > 50);
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
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0A1A1A]/95 backdrop-blur-xl shadow-2xl border-b border-[#1A2D2D]'
                    : 'bg-gradient-to-r from-[#005A3E]/95 via-[#00684A]/95 to-[#0A7A5A]/95 backdrop-blur-md border-b border-[#1A8A6A]/30'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-bold text-[#00ED64] tracking-tight drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                                &lt;MH/&gt;
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            {sections.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleClick(id)}
                                    className={`relative px-2 py-1 text-sm font-medium transition-all duration-200 ${active === id
                                        ? 'text-[#00ED64]'
                                        : 'text-white/90 hover:text-[#00ED64]'
                                        }`}
                                >
                                    {label}
                                    {active === id && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ED64] shadow-lg shadow-[#00ED64]/30"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}

                            {/* Admin Button */}
                            <Link
                                href={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border border-[#00ED64]/40 text-[#00ED64] hover:bg-[#00ED64]/10 hover:border-[#00ED64] hover:shadow-lg hover:shadow-[#00ED64]/20"
                            >
                                <Shield size={14} />
                                {isAuthenticated ? 'Dashboard' : 'Admin'}
                            </Link>

                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Controls */}
                        <div className="flex items-center gap-2 md:hidden">
                            <Link
                                href={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border border-[#00ED64]/40 text-[#00ED64]"
                            >
                                <Shield size={12} />
                                {isAuthenticated ? 'Dashboard' : 'Admin'}
                            </Link>
                            <ThemeToggle />
                            <button
                                className="text-[#00ED64] hover:scale-110 transition-transform duration-200"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Bottom Sheet */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A1A1A]/95 backdrop-blur-xl border-t border-[#1A2D2D] rounded-t-3xl shadow-2xl"
                        style={{ maxHeight: '70vh' }}
                    >
                        <div className="w-12 h-1 bg-[#2A4A4A] rounded-full mx-auto mt-3 mb-2" />
                        <div className="flex flex-col space-y-2 px-6 py-4 pb-8">
                            {sections.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleClick(id)}
                                    className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${active === id
                                        ? 'text-[#00ED64] bg-[#00ED64]/10 border-l-2 border-[#00ED64]'
                                        : 'text-white/80 hover:text-[#00ED64] hover:bg-[#00ED64]/5'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}