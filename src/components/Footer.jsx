'use client';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ArrowUp, Heart } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Footer() {
    const [heroData, setHeroData] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        // Fetch hero data (social links + description)
        fetch(`${BACKEND_URL}/api/hero`)
            .then((r) => r.json())
            .then(setHeroData)
            .catch(() => { });

        // Fetch contact info (email, phone, location)
        fetch(`${BACKEND_URL}/api/contact-info`)
            .then((r) => r.json())
            .then(setContactInfo)
            .catch(() => { });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const currentYear = new Date().getFullYear();

    // Data from API (with fallbacks)
    const github = heroData?.github || '#';
    const linkedin = heroData?.linkedin || '#';
    const facebook = heroData?.facebook || '#';
    const description = heroData?.description || 'Full‑stack developer with a physics background. Building clean, efficient digital experiences with modern web technologies.';
    const email = contactInfo?.email || 'mehedy.hasan@example.com';
    const phone = contactInfo?.phone || '+880 1XXX-XXXXXX';
    const location = contactInfo?.location || 'Pabna, Bangladesh';

    return (
        <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

                    {/* Brand column */}
                    <div>
                        <h3 className="text-2xl font-bold text-amber-400 mb-4">&lt;MH /&gt;</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="flex items-center gap-3">
                            {github && github !== '#' && (
                                <a
                                    href={github}
                                    target="_blank"
                                    className="w-9 h-9 bg-gray-800 hover:bg-amber-500 hover:text-gray-900 rounded-lg flex items-center justify-center transition-all duration-200"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={16} />
                                </a>
                            )}
                            {linkedin && linkedin !== '#' && (
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    className="w-9 h-9 bg-gray-800 hover:bg-amber-500 hover:text-gray-900 rounded-lg flex items-center justify-center transition-all duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={16} />
                                </a>
                            )}
                            {facebook && facebook !== '#' && (
                                <a
                                    href={facebook}
                                    target="_blank"
                                    className="w-9 h-9 bg-gray-800 hover:bg-amber-500 hover:text-gray-900 rounded-lg flex items-center justify-center transition-all duration-200"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', href: '#hero' },
                                { label: 'About', href: '#about' },
                                { label: 'Skills', href: '#skills' },
                                { label: 'Projects', href: '#projects' },
                                { label: 'Contact', href: '#contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById(link.href.replace('#', ''));
                                            if (el) el.scrollIntoView({ behavior: 'instant' });
                                        }}
                                        className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                                    >
                                        → {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info — from API */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
                        <ul className="space-y-3">
                            {email && (
                                <li>
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-center gap-3 text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                                    >
                                        <FaEnvelope className="text-amber-500 flex-shrink-0" size={14} />
                                        {email}
                                    </a>
                                </li>
                            )}
                            {phone && (
                                <li>
                                    <a
                                        href={`tel:${phone.replace(/\s/g, '')}`}
                                        className="flex items-center gap-3 text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                                    >
                                        <FaPhone className="text-amber-500 flex-shrink-0" size={14} />
                                        {phone}
                                    </a>
                                </li>
                            )}
                            {location && (
                                <li className="flex items-center gap-3 text-gray-400 text-sm">
                                    <FaMapMarkerAlt className="text-amber-500 flex-shrink-0" size={14} />
                                    {location}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        © {currentYear} Mehedy Hasan. Built with <Heart className="text-red-500 inline" size={14} fill="currentColor" /> using Next.js
                    </p>

                    {/* Scroll to top */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-amber-500 hover:text-gray-900 text-gray-400 rounded-lg text-sm transition-all duration-200"
                    >
                        <ArrowUp size={14} />
                        Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
}