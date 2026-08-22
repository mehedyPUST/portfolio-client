'use client';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ArrowUp, Heart } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Footer() {
    const [heroData, setHeroData] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/hero`)
            .then((r) => r.json())
            .then(setHeroData)
            .catch(() => { });

        fetch(`${BACKEND_URL}/api/contact-info`)
            .then((r) => r.json())
            .then(setContactInfo)
            .catch(() => { });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const currentYear = new Date().getFullYear();

    const github = heroData?.github || '#';
    const linkedin = heroData?.linkedin || '#';
    const facebook = heroData?.facebook || '#';
    const description = heroData?.description || 'Full‑stack developer with a physics background. Building clean, efficient digital experiences with modern web technologies.';
    const email = contactInfo?.email || 'mehedy.hasan@example.com';
    const phone = contactInfo?.phone || '+880 1XXX-XXXXXX';
    const location = contactInfo?.location || 'Pabna, Bangladesh';

    return (
        <footer className="bg-dark text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-primary-400 mb-4">&lt;MH /&gt;</h3>
                        <p className="text-gray-300 dark:text-gray-300 text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="flex items-center gap-3">
                            {github && github !== '#' && (
                                <a
                                    href={github}
                                    target="_blank"
                                    className="w-10 h-10 bg-dark-elevated hover:bg-primary-500 hover:text-dark rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-primary-500/30"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={18} />
                                </a>
                            )}
                            {linkedin && linkedin !== '#' && (
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    className="w-10 h-10 bg-dark-elevated hover:bg-primary-500 hover:text-dark rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-primary-500/30"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                            )}
                            {facebook && facebook !== '#' && (
                                <a
                                    href={facebook}
                                    target="_blank"
                                    className="w-10 h-10 bg-dark-elevated hover:bg-primary-500 hover:text-dark rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-primary-500/30"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
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
                                        className="text-gray-300 hover:text-primary-400 text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                                    >
                                        → {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Get In Touch</h4>
                        <ul className="space-y-3.5">
                            {email && (
                                <li>
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-center gap-3 text-gray-300 hover:text-primary-400 text-sm transition-all duration-200 group"
                                    >
                                        <FaEnvelope className="text-primary-400 group-hover:scale-110 transition-transform duration-200" size={16} />
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{email}</span>
                                    </a>
                                </li>
                            )}
                            {phone && (
                                <li>
                                    <a
                                        href={`tel:${phone.replace(/\s/g, '')}`}
                                        className="flex items-center gap-3 text-gray-300 hover:text-primary-400 text-sm transition-all duration-200 group"
                                    >
                                        <FaPhone className="text-primary-400 group-hover:scale-110 transition-transform duration-200" size={16} />
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{phone}</span>
                                    </a>
                                </li>
                            )}
                            {location && (
                                <li className="flex items-center gap-3 text-gray-300 text-sm group">
                                    <FaMapMarkerAlt className="text-primary-400 group-hover:scale-110 transition-transform duration-200" size={16} />
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{location}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        © {currentYear} Mehedy Hasan. Built with{' '}
                        <Heart className="text-primary-400 inline animate-pulse" size={14} fill="currentColor" />{' '}
                        using Next.js
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-5 py-2.5 bg-dark-elevated hover:bg-primary-500 hover:text-dark text-gray-300 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-primary-500/30"
                    >
                        <ArrowUp size={16} />
                        Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
}