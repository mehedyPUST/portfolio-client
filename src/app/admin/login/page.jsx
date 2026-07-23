'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // ✅ Fixed: redirect inside useEffect, not during render
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);
        setLoading(false);

        if (result.success) {
            router.push('/admin/dashboard');
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }
    };

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Don't render login form if already authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-gray-900 px-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)]" />
            <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Back to site link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-emerald-200 hover:text-amber-400 mb-6 transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </Link>

                {/* Login card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                    {/* Icon + Title */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                            className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25"
                        >
                            <Shield className="text-white" size={28} />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Admin Login
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Enter your credentials to manage your portfolio
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm flex items-center gap-2"
                            >
                                <span>⚠</span>
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-xl transition shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-emerald-300/50 dark:text-gray-500 text-xs mt-6">
                    Protected area. Unauthorized access is prohibited.
                </p>
            </motion.div>
        </div>
    );
}