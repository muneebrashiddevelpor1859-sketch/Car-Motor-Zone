import { Bodoni_Moda, Manrope } from 'next/font/google';
import './globals.css';

const display = Bodoni_Moda({ subsets: ['latin'], variable: '--font-display', display: 'swap', adjustFontFallback: false });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: 'BJO Motors | Luxury Car Workshop',
  description: 'BJO Motors offers premium car servicing, detailing, diagnostics, tuning, and repairs, with expert care for every brand.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head><link rel="preload" as="image" href="/images/hero-poster.jpg" /></head>
      <body>{children}</body>
    </html>
  );
}
