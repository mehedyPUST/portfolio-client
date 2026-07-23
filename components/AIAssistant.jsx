'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';

export default function AIAssistant() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-emerald-200 dark:border-gray-700 p-4"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                                AI Assistant
                            </span>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-amber-500"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="h-48 bg-emerald-50 dark:bg-gray-900 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                            <p className="mb-2">
                                👋 Hi! I'm Mehedy's AI assistant. Ask me about:
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>His skills & experience</li>
                                <li>Project details</li>
                                <li>Physics background</li>
                            </ul>
                            <p className="mt-3 italic">(Integration ready – connect your AI backend)</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 p-4 rounded-full shadow-lg transition"
                aria-label="Toggle AI assistant"
            >
                <Bot size={24} />
            </button>
        </div>
    );
}