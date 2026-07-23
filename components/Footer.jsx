export default function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-black text-emerald-100 dark:text-gray-400 py-8 text-center">
            <p>© {new Date().getFullYear()} Mehedy Hasan. Built with Next.js & 💚</p>
        </footer>
    );
}