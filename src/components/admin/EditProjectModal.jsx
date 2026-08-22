'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Eye, Code, ImageIcon, Link2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EditProjectModal({ project, onClose, onUpdate }) {
    const [form, setForm] = useState({
        name: project.name || '',
        image: project.image || '',
        tech: project.tech || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        live: project.live || '',
        github: project.github || '',
        backendGithub: project.backendGithub || '',
        challenges: project.challenges || '',
        improvements: project.improvements || '',
        featured: project.featured || false,
        order: project.order || 0,
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(project.image || '');
    const fileInputRef = useRef(null);

    const [descMode, setDescMode] = useState('html');
    const [challengesMode, setChallengesMode] = useState('html');
    const [improvementsMode, setImprovementsMode] = useState('html');

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
            toast.success('Image uploaded');
        } else {
            toast.error('Image upload failed');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetch(`${BACKEND_URL}/api/projects/${project._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            toast.success('Project updated!');
            onUpdate();
        } catch {
            toast.error('Failed to update project');
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        'w-full px-3.5 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-xl text-sm text-gray-900 dark:text-light placeholder:text-gray-400 dark:placeholder:text-light-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition';
    const labelClass = 'block text-sm font-medium text-gray-700 dark:text-light-muted mb-1.5';

    const RichTextField = ({ label, value, onChange, mode, setMode, rows = 3, required = false }) => (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass + ' mb-0'}>
                    {label} {required && <span className="text-primary-500">*</span>}
                </label>
                <button
                    type="button"
                    onClick={() => setMode(mode === 'html' ? 'preview' : 'html')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-light-muted hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-dark-elevated rounded-lg transition"
                >
                    {mode === 'html' ? (
                        <>
                            <Eye size={12} /> Preview
                        </>
                    ) : (
                        <>
                            <Code size={12} /> HTML
                        </>
                    )}
                </button>
            </div>
            {mode === 'html' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    required={required}
                    className={inputClass + ' font-mono resize-y min-h-[80px]'}
                />
            ) : (
                <div
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-xl min-h-[80px] prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: value || '<p class="text-gray-400 dark:text-light-muted italic">Nothing to preview</p>',
                    }}
                />
            )}
            <p className="text-[11px] text-gray-400 dark:text-light-muted mt-1.5">HTML & Tailwind classes supported</p>
        </div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    className="relative bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200/80 dark:border-dark-border overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-border shrink-0">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-light tracking-tight">
                                Edit Project
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-light-muted mt-0.5 truncate max-w-[280px]">
                                {project.name}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-light hover:bg-gray-100 dark:hover:bg-dark-elevated transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className={labelClass}>Screenshot</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative group border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-all ${preview
                                            ? 'border-primary-400/50 dark:border-primary-500/40'
                                            : 'border-gray-200 dark:border-dark-border hover:border-primary-400 dark:hover:border-primary-500'
                                        }`}
                                >
                                    {preview ? (
                                        <div className="relative">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                <span className="flex items-center gap-2 text-white text-sm font-medium">
                                                    <Upload size={16} /> Change image
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                                                <ImageIcon className="text-primary-500" size={22} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-700 dark:text-light">
                                                    Click to upload screenshot
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-light-muted mt-1">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
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
                                {uploading && (
                                    <p className="text-primary-500 text-xs mt-2 flex items-center gap-1.5">
                                        <span className="w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                        Uploading...
                                    </p>
                                )}
                            </div>

                            {/* Name + Tech */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        Project Name <span className="text-primary-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Tech Stack <span className="text-primary-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.tech}
                                        onChange={(e) => setForm({ ...form, tech: e.target.value })}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className={labelClass}>Short Description</label>
                                <input
                                    type="text"
                                    value={form.shortDescription}
                                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                                    placeholder="Brief summary shown on project cards..."
                                    maxLength={120}
                                    className={inputClass}
                                />
                                <p className="text-[11px] text-gray-400 dark:text-light-muted mt-1.5 text-right">
                                    {form.shortDescription?.length || 0}/120
                                </p>
                            </div>

                            {/* Description */}
                            <RichTextField
                                label="Description"
                                value={form.description}
                                onChange={(value) => setForm({ ...form, description: value })}
                                mode={descMode}
                                setMode={setDescMode}
                                rows={4}
                                required
                            />

                            {/* Links Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-light-muted">
                                    <Link2 size={14} className="text-primary-500" />
                                    Project Links
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-light-muted mb-1">
                                            Live URL
                                        </label>
                                        <input
                                            type="url"
                                            value={form.live}
                                            onChange={(e) => setForm({ ...form, live: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-light-muted mb-1">
                                            Frontend GitHub
                                        </label>
                                        <input
                                            type="url"
                                            value={form.github}
                                            onChange={(e) => setForm({ ...form, github: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-light-muted mb-1">
                                            Backend GitHub
                                        </label>
                                        <input
                                            type="url"
                                            value={form.backendGithub}
                                            onChange={(e) => setForm({ ...form, backendGithub: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Challenges + Improvements */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <RichTextField
                                    label="Challenges"
                                    value={form.challenges}
                                    onChange={(value) => setForm({ ...form, challenges: value })}
                                    mode={challengesMode}
                                    setMode={setChallengesMode}
                                    rows={3}
                                />
                                <RichTextField
                                    label="Future Improvements"
                                    value={form.improvements}
                                    onChange={(value) => setForm({ ...form, improvements: value })}
                                    mode={improvementsMode}
                                    setMode={setImprovementsMode}
                                    rows={3}
                                />
                            </div>

                            {/* Order + Featured */}
                            <div className="flex flex-wrap items-center gap-6 pt-1">
                                <div className="w-28">
                                    <label className={labelClass}>Order</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={(e) =>
                                            setForm({ ...form, order: parseInt(e.target.value) || 0 })
                                        }
                                        className={inputClass}
                                    />
                                </div>
                                <label className="flex items-center gap-2.5 cursor-pointer select-none mt-5">
                                    <div
                                        className={`relative w-10 h-6 rounded-full transition-colors ${form.featured
                                                ? 'bg-primary-500'
                                                : 'bg-gray-200 dark:bg-dark-elevated'
                                            }`}
                                        onClick={() => setForm({ ...form, featured: !form.featured })}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-4' : ''
                                                }`}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-light-muted flex items-center gap-1.5">
                                        <Star size={14} className={form.featured ? 'text-primary-500 fill-primary-500' : ''} />
                                        Featured
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 px-6 py-4 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-700 dark:text-light-muted bg-gray-100 dark:bg-dark-elevated hover:bg-gray-200 dark:hover:bg-dark-border rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving || uploading}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition disabled:opacity-50 shadow-lg shadow-primary-600/25"
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : 'Update Project'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}