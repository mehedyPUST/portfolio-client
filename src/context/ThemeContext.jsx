'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark'); // ← ডিফল্ট dark

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored) {
            // ইউজারের সেভ করা পছন্দ থাকলে সেটা ব্যবহার করো
            setTheme(stored);
            document.documentElement.classList.toggle('dark', stored === 'dark');
        } else {
            // প্রথম ভিজিট — ডিফল্ট dark
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);