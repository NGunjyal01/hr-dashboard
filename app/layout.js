'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import Layout from '@/components/Layout';

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const isDark = stored === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <TooltipProvider>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              {children}
            </Layout>
            <Toaster richColors closeButton/>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
