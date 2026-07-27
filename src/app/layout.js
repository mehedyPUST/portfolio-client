import './globals.css';
import { Inter, Lora } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const lora = Lora({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-lora' });

export const metadata = {
  title: 'Mehedy Hasan | Full‑Stack Developer',
  description: 'Physics researcher turned full‑stack developer.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} ${lora.variable} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <CustomCursor />
            {children}
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            style: {
              background: '#065f46',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}