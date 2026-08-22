'use client';
import { motion } from 'framer-motion';

export default function AnimatedGradient({ children, className }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(-45deg, #00684A, #00ED64, #0A7A5A, #00684A)',
                    backgroundSize: '400% 400%',
                }}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}