import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
            <Skeleton height={180} className="rounded-xl" />
            <Skeleton width="60%" height={24} className="mt-4" />
            <Skeleton count={2} className="mt-2" />
            <Skeleton width="40%" height={20} className="mt-4" />
        </div>
    );
}