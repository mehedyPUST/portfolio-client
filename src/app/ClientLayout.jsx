'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    return (
        <ThemeProvider>
            <AuthProvider>
                <CustomCursor />
                <ReadingProgress />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
                <BackToTop />
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        className: 'dark:bg-dark-surface dark:text-light',
                        style: {
                            background: '#00684A',
                            color: '#E8F0F0',
                            borderRadius: '12px',
                        },
                    }}
                />
            </AuthProvider>
        </ThemeProvider>
    );
}