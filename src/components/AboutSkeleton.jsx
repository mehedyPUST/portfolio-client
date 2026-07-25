export default function AboutSkeleton() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 space-y-4">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto animate-pulse" />
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6" />
                </div>
            </div>
        </section>
    );
}