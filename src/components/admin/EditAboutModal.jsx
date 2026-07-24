'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Save } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EditAboutModal({ aboutData, onClose, onUpdate }) {
    const [paragraphs, setParagraphs] = useState(
        aboutData?.paragraphs?.length ? aboutData.paragraphs : ['']
    );
    const [saving, setSaving] = useState(false);

    const addParagraph = () => {
        setParagraphs([...paragraphs, '']);
    };

    const removeParagraph = (index) => {
        if (paragraphs.length <= 1) return;
        setParagraphs(paragraphs.filter((_, i) => i !== index));
    };

    const updateParagraph = (index, value) => {
        const updated = [...paragraphs];
        updated[index] = value;
        setParagraphs(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/about`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paragraphs: paragraphs.filter((p) => p.trim() !== ''),
                }),
            });

            if (res.ok) {
                onUpdate();
            } else {
                alert('Failed to save changes');
            }
        } catch (error) {
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Edit About Section
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {paragraphs.filter((p) => p.trim()).length} paragraph(s)
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {paragraphs.map((para, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-2"
                        >
                            <div className="flex-1 relative">
                                <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-2 text-xs text-gray-500 dark:text-gray-400">
                                    Paragraph {index + 1}
                                </span>
                                <textarea
                                    value={para}
                                    onChange={(e) => updateParagraph(index, e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 pt-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                                    placeholder="Write your about content here..."
                                />
                            </div>
                            {paragraphs.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeParagraph(index)}
                                    className="self-start mt-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"
                                    title="Remove paragraph"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <button
                        type="button"
                        onClick={addParagraph}
                        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition text-sm font-medium"
                    >
                        <Plus size={16} />
                        Add Paragraph
                    </button>
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
                            disabled={saving}
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