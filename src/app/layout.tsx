import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pietra UI',
  description: 'Built-in components for personal projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
