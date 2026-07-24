'use client';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';


export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-amber-400 hover:bg-emerald-800 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}