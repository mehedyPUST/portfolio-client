'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Save } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EditProjectModal({ project, onClose, onUpdate }) {
    const [form, setForm] = useState({
        name: project.name || '',
        image: project.image || '',
        tech: project.tech || '',
        description: project.description || '',
        live: project.live || '',
        github: project.github || '',
        challenges: project.challenges || '',
        improvements: project.improvements || '',
        featured: project.featured || false,
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(project.image || '');
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);

        setUploading(true);
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

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
        setSaving(true);
        await fetch(`${BACKEND_URL}/api/projects/${project._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setSaving(false);
        onUpdate();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Edit Project</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Screenshot</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400 transition"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="h-40 mx-auto rounded-lg object-cover" />
                            ) : (
                                <div className="py-8">
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-500">Click to change image</p>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                        {uploading && <p className="text-amber-500 text-sm mt-1">Uploading...</p>}
                    </div>

                    {/* Fields (same as AddProjectModal) */}
                    {[
                        { key: 'name', label: 'Project Name *', type: 'text' },
                        { key: 'tech', label: 'Tech Stack *', type: 'text' },
                        { key: 'description', label: 'Description *', type: 'textarea', rows: 3 },
                        { key: 'live', label: 'Live URL', type: 'url' },
                        { key: 'github', label: 'GitHub URL', type: 'url' },
                        { key: 'challenges', label: 'Challenges', type: 'textarea', rows: 2 },
                        { key: 'improvements', label: 'Future Improvements', type: 'textarea', rows: 2 },
                    ].map(({ key, label, type, rows }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    rows={rows}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                                />
                            ) : (
                                <input
                                    type={type}
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                                />
                            )}
                        </div>
                    ))}

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                            className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Featured project</span>
                    </label>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl transition"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Update'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}