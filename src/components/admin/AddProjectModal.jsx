'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Save } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddProjectModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        name: '',
        image: '',
        tech: '',
        description: '',
        live: '',
        github: '',
        challenges: '',
        improvements: '',
        featured: false,
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show local preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);

        // Convert to base64
        setUploading(true);
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

        // Upload to ImgBB via backend
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 }),
        });
        const data = await res.json();

        if (data.success) {
            setForm({ ...form, image: data.url });
        } else {
            alert('Image upload failed');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.image || !form.tech || !form.description) {
            alert('Please fill all required fields');
            return;
        }
        setSaving(true);
        await fetch(`${BACKEND_URL}/api/projects`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setSaving(false);
        onAdd();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Add Project</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Screenshot *
                        </label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400 transition"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="h-40 mx-auto rounded-lg object-cover" />
                            ) : (
                                <div className="py-8">
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-500">Click to upload screenshot</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                        {uploading && <p className="text-amber-500 text-sm mt-1">Uploading...</p>}
                        {form.image && !uploading && <p className="text-emerald-500 text-sm mt-1">✓ Image uploaded</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project Name *
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tech Stack *
                        </label>
                        <input
                            type="text"
                            value={form.tech}
                            onChange={(e) => setForm({ ...form, tech: e.target.value })}
                            required
                            placeholder="Next.js, MongoDB, Tailwind"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description *
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Live & GitHub URLs */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Live URL
                            </label>
                            <input
                                type="url"
                                value={form.live}
                                onChange={(e) => setForm({ ...form, live: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                GitHub URL
                            </label>
                            <input
                                type="url"
                                value={form.github}
                                onChange={(e) => setForm({ ...form, github: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                    </div>

                    {/* Challenges */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Challenges
                        </label>
                        <textarea
                            value={form.challenges}
                            onChange={(e) => setForm({ ...form, challenges: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Improvements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Future Improvements
                        </label>
                        <textarea
                            value={form.improvements}
                            onChange={(e) => setForm({ ...form, improvements: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Featured checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                            className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Featured project</span>
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Add Project'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}