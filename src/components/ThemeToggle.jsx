'use client';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-amber-400 hover:bg-emerald-800 dark:hover:bg-gray-700 transition overflow-hidden"
            aria-label="Toggle dark mode"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
        </button>
    );
}