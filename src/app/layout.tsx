import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from '@/providers/react-query';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'E-Commerce Application',
  openGraph: {
    title: 'E-Commerce',
    description: 'E-Commerce Application',
    url: 'https://ecommerce.example.com'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col justify-between antialiased`}
      >
        <ReactQueryProvider>
          <div>
            <Header />
            {children}
            <Toaster />
          </div>
          <div>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
