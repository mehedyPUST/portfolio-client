export default function HeroSkeleton() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-emerald-900/50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <div className="h-12 w-48 bg-emerald-700/50 rounded-full animate-pulse" />
                    <div className="h-6 w-64 bg-emerald-700/50 rounded-full animate-pulse" />
                    <div className="h-4 w-80 bg-emerald-700/50 rounded animate-pulse" />
                    <div className="h-12 w-40 bg-amber-500/30 rounded-full animate-pulse mt-8" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="w-72 h-72 md:w-96 md:h-96 bg-emerald-700/50 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}