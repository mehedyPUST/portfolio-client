'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AIAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hi! I'm Mehedy's AI assistant. Ask me about his skills, projects, physics background, or anything!",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const userMessage = { role: 'user', content: trimmed };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: trimmed }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.reply || 'Sorry, try again!' },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Network error. Please try again.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestions = [
        'What skills does Mehedy have?',
        'Tell me about his projects',
        'What is his education?',
    ];

    const handleSuggestion = (text) => {
        setInput(text);
        setTimeout(() => {
            setInput('');
            const userMessage = { role: 'user', content: text };
            setMessages((prev) => [...prev, userMessage]);
            setLoading(true);
            fetch(`${BACKEND_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
                })
                .catch(() => {
                    setMessages((prev) => [...prev, { role: 'assistant', content: 'Network error.' }]);
                })
                .finally(() => setLoading(false));
        }, 100);
    };

    return (
        <div className="fixed bottom-32 right-6 z-50">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border overflow-hidden flex flex-col"
                        style={{ maxHeight: '520px' }}
                    >
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-700 dark:to-primary-600">
                            <div className="flex items-center gap-2 text-white">
                                <div className="relative">
                                    <Bot size={20} />
                                    <Sparkles className="absolute -top-1 -right-1 text-primary-400" size={10} />
                                </div>
                                <span className="font-semibold text-sm">AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white/80 hover:text-white transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '330px' }}>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-primary-500 text-white rounded-br-md'
                                                : 'bg-gray-100 dark:bg-dark-elevated text-gray-800 dark:text-light rounded-bl-md'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-dark-elevated px-4 py-2.5 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSuggestion(s)}
                                        className="text-xs px-2.5 py-1.5 bg-primary-50 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full hover:bg-primary-100 dark:hover:bg-primary-500/30 transition border border-primary-200 dark:border-primary-800"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="p-3 border-t border-gray-200 dark:border-dark-border flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 dark:text-light"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="p-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-dark-border text-white rounded-xl transition disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="relative bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg transition hover:shadow-xl shadow-lg shadow-primary-500/30"
                aria-label="Toggle AI assistant"
            >
                <Bot size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full border-2 border-white dark:border-dark-surface animate-pulse" />
            </motion.button>
        </div>
    );
}