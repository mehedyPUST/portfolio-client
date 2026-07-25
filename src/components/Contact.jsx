'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MapPin, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Contact() {
    const { isAuthenticated } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [contactData, setContactData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({ email: '', phone: '', whatsapp: '', location: '' });
    const [saving, setSaving] = useState(false);

    const fetchContactData = () => {
        fetch(`${BACKEND_URL}/api/contact-info`)
            .then((r) => r.json())
            .then((data) => {
                setContactData(data);
                setEditForm({
                    email: data?.email || '',
                    phone: data?.phone || '',
                    whatsapp: data?.whatsapp || '',
                    location: data?.location || 'Pabna, Bangladesh',
                });
            })
            .catch(() => { });
    };

    useEffect(() => {
        fetchContactData();
    }, []);

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
                toast.success('Message sent! I’ll get back to you soon.');
            } else {
                setStatus('error');
                toast.error('Failed to send. Please try again.');
            }
        } catch {
            setStatus('error');
            toast.error('Network error. Please try again.');
        }
        setTimeout(() => setStatus(''), 5000);
    };

    const handleEditSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${BACKEND_URL}/api/contact-info`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });
            if (res.ok) {
                setContactData(editForm);
                setEditing(false);
                toast.success('Contact info updated!');
            } else {
                toast.error('Failed to save');
            }
        } catch {
            toast.error('Network error');
        }
        setSaving(false);
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have a project in mind or just want to say hello? Fill out the form below.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Info Cards */}
                        <div className="lg:w-1/3 space-y-6">
                            <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm break-all">
                                            {contactData?.email || 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {contactData?.phone || 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl border border-emerald-100 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {contactData?.location || 'Pabna, Bangladesh'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:w-2/3">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-emerald-50 dark:bg-gray-800 p-8 rounded-2xl border border-emerald-100 dark:border-gray-700"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                                    />
                                </div>
                                <textarea
                                    rows="5"
                                    placeholder="Your Message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent mb-6 resize-none"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-gray-900 font-semibold py-4 rounded-xl transition shadow-lg"
                                >
                                    <Send size={18} />
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                                {status === 'success' && (
                                    <p className="text-emerald-600 mt-4 text-center">Message sent successfully!</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-500 mt-4 text-center">Failed to send. Please try again.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {isAuthenticated && (
                <button
                    onClick={() => setEditing(true)}
                    className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-lg text-sm transition z-10"
                >
                    <Edit size={14} /> Edit Contact
                </button>
            )}

            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6"
                    >
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Edit Contact Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label>
                                <input
                                    type="text"
                                    value={editForm.whatsapp}
                                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditing(false)}
                                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                disabled={saving}
                                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}