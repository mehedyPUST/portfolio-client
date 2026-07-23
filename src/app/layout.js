import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';
import { Inter } from 'next/font/google';
import CustomCursor from '../../components/CustomCursor';



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mehedy Hasan | Full‑Stack Developer',
  description: 'Physics researcher turned full‑stack developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}