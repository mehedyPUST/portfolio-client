'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Upload, Camera } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function EditHeroModal({ heroData, onClose, onUpdate }) {
    const [form, setForm] = useState({
        title: heroData?.title || 'Mehedy Hasan',
        subtitle: heroData?.subtitle || 'Full‑Stack Developer | Physics Researcher',
        description: heroData?.description || '',
        resumeLink: heroData?.resumeLink || '',
        github: heroData?.github || '',
        linkedin: heroData?.linkedin || '',
        facebook: heroData?.facebook || '',
        photoUrl: heroData?.photoUrl || '',
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(heroData?.photoUrl || '');
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
        try {
            const res = await fetch(`${BACKEND_URL}/api/upload`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 }),
            });
            const data = await res.json();

            if (data.success) {
                setForm({ ...form, photoUrl: data.url });
            } else {
                alert('Image upload failed. Please try again.');
            }
        } catch {
            alert('Upload failed. Check your connection.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/hero`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                onUpdate();
            } else {
                alert('Failed to save changes');
            }
        } catch {
            alert('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Edit Hero Section
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Update your introduction
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* Profile Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Profile Photo
                        </label>
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-amber-400 transition group flex-shrink-0"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Camera size={24} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <Upload className="text-white" size={20} />
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Click the photo to upload a new one
                                </p>
                                {uploading && (
                                    <p className="text-amber-500 text-sm mt-1">Uploading...</p>
                                )}
                                {form.photoUrl && !uploading && (
                                    <p className="text-emerald-500 text-sm mt-1">✓ Photo uploaded</p>
                                )}
                            </div>
                        </div>
                        {/* URL input fallback */}
                        <input
                            type="url"
                            value={form.photoUrl}
                            onChange={(e) => {
                                setForm({ ...form, photoUrl: e.target.value });
                                setPreview(e.target.value);
                            }}
                            placeholder="Or paste image URL directly"
                            className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title / Name *
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subtitle / Designation *
                        </label>
                        <input
                            type="text"
                            value={form.subtitle}
                            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Short Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400 resize-none"
                        />
                    </div>

                    {/* Resume Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Resume Link (Google Drive)
                        </label>
                        <input
                            type="url"
                            value={form.resumeLink}
                            onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                            placeholder="https://drive.google.com/..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</p>

                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">GitHub</label>
                            <input
                                type="url"
                                value={form.github}
                                onChange={(e) => setForm({ ...form, github: e.target.value })}
                                placeholder="https://github.com/..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                value={form.linkedin}
                                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Facebook</label>
                            <input
                                type="url"
                                value={form.facebook}
                                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                                placeholder="https://facebook.com/..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-400 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving || uploading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-xl transition"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}