'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EditAboutModal from './admin/EditAboutModal';



const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function About() {
    const { isAuthenticated } = useAuth();
    const [aboutData, setAboutData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchAbout = () => {
        fetch(`${BACKEND_URL}/api/about`).then(r => r.json()).then(setAboutData).catch(() => { });
    };

    useEffect(() => { fetchAbout(); }, []);

    const paragraphs = aboutData?.paragraphs?.length ? aboutData.paragraphs : [
        "I'm Mehedy Hasan, a full‑stack developer with an MSc in Physics from Pabna University of Science & Technology.",
        "I completed web development training at Programming Hero Bootcamp (Batch 13).",
        "Outside coding, I enjoy science documentaries, chess, and quantum mechanics.",
    ];

    return (
        <>
            <section id="about" className="py-20 bg-white dark:bg-gray-900 relative">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-8 text-center">About Me</h2>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
                    </motion.div>
                </div>
                {isAuthenticated && <button onClick={() => setShowEditModal(true)} className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-lg text-sm"><Edit size={14} /> Edit</button>}
            </section>
            {showEditModal && <EditAboutModal aboutData={aboutData} onClose={() => setShowEditModal(false)} onUpdate={() => { fetchAbout(); setShowEditModal(false); }} />}
        </>
    );
}