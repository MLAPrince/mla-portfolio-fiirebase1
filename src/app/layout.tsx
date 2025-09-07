import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeonFolio | Mohiudeen',
  description: 'Futuristic personal portfolio of Mohiudeen, an aspiring software engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
        
        <Script id="chatbase-config">
          {`
            window.embeddedChatbotConfig = {
              chatbotId: "iCmAXm5AqDyGhpZC-eHQx",
              domain: "www.chatbase.co"
            }
          `}
        </Script>
        <Script 
          src="https://www.chatbase.co/embed.min.js"
          id="iCmAXm5AqDyGhpZC-eHQx"
          domain="www.chatbase.co"
          defer
        />
      </body>
    </html>
  );
}
