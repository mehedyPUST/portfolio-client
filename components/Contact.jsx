'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MapPin, MessageSquare } from 'lucide-react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(''); // 'sending' | 'success' | 'error'

    // Replace with your actual backend URL after deployment
    const BACKEND_URL = 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Info Cards */}
                        <div className="lg:w-1/3 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                                        <Mail className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">mehedy.hasan@example.com</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                                        <Phone className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">+880 1XXX-XXXXXX</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                                        <MapPin className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Pabna, Bangladesh</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="lg:w-2/3"
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="bg-emerald-50 dark:bg-gray-800 p-8 rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                                            Your Email *
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        rows="5"
                                        placeholder="Tell me about your project..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 disabled:cursor-not-allowed text-gray-900 font-semibold px-6 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-gray-900"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-lg"
                                    >
                                        <p className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                            <MessageSquare size={16} />
                                            Message sent successfully! I'll get back to you soon.
                                        </p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                                    >
                                        <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
                                            <MessageSquare size={16} />
                                            Failed to send message. Please try again or email me directly.
                                        </p>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}