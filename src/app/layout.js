'use client';

import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle app update available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  if (!isClient) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PM Internship Platform</title>
        </head>
        <body className={inter.className}>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PM Skills" />
        <meta name="application-name" content="PM Skills" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#3b82f6" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/sw.js" as="script" />
        
        {/* SEO */}
        <meta name="description" content="Connect PM interns with perfect internship opportunities through intelligent skill matching" />
        <meta name="keywords" content="internship, product management, skills, matching, career" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PM Internship Skill-Matching Platform" />
        <meta property="og:description" content="Connect PM interns with perfect internship opportunities through intelligent skill matching" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PM Internship Platform" />
        <meta name="twitter:description" content="Connect PM interns with perfect internship opportunities" />
        
        <title>PM Internship Platform</title>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {children}
            <PWAInstallPrompt />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}