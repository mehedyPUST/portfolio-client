import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow p-4 border border-gray-200 dark:border-dark-border">
            <Skeleton height={180} className="rounded-xl" baseColor="#e5e7eb" highlightColor="#f3f4f6" />
            <Skeleton width="60%" height={24} className="mt-4" baseColor="#e5e7eb" highlightColor="#f3f4f6" />
            <Skeleton count={2} className="mt-2" baseColor="#e5e7eb" highlightColor="#f3f4f6" />
            <Skeleton width="40%" height={20} className="mt-4" baseColor="#e5e7eb" highlightColor="#f3f4f6" />
        </div>
    );
}