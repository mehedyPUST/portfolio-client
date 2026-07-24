'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        // Detect touch device
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (hasCoarsePointer || hasTouch) {
            setIsTouchDevice(true);
            return; // Skip cursor logic on touch devices
        }

        const move = (e) => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
                if (!visible) setVisible(true);
            });
        };

        const hide = () => setVisible(false);
        const show = () => setVisible(true);

        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseleave', hide);
        document.addEventListener('mouseenter', show);

        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, .interactive'
        );
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseleave', hide);
            document.removeEventListener('mouseenter', show);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [visible]);

    // Don't render cursor on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 border-emerald-500 bg-transparent"
                style={{ x: position.x - 16, y: position.y - 16 }}
                animate={{
                    scale: hovered ? 1.8 : 1,
                    borderColor: hovered ? '#f59e0b' : '#10b981',
                    boxShadow: hovered
                        ? '0 0 20px rgba(245, 158, 11, 0.5)'
                        : '0 0 10px rgba(16, 185, 129, 0.3)',
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
            />

            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999]"
                style={{ x: position.x - 4, y: position.y - 4 }}
                animate={{
                    scale: hovered ? 1.5 : 1,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
            />
        </>
    );
}