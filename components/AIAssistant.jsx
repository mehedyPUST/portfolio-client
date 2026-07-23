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
                        className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                        style={{ maxHeight: '520px' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-800 dark:to-emerald-700">
                            <div className="flex items-center gap-2 text-white">
                                <div className="relative">
                                    <Bot size={20} />
                                    <Sparkles className="absolute -top-1 -right-1 text-amber-300" size={10} />
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

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '330px' }}>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-amber-500 text-gray-900 rounded-br-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-2xl rounded-bl-md">
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

                        {/* Suggestions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSuggestion(s)}
                                        className="text-xs px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition border border-emerald-200 dark:border-emerald-800"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="p-2 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-gray-900 rounded-xl transition disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button - positioned higher */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="relative bg-amber-500 hover:bg-amber-400 text-gray-900 p-4 rounded-full shadow-lg transition hover:shadow-xl"
                aria-label="Toggle AI assistant"
            >
                <Bot size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
            </motion.button>
        </div>
    );
}