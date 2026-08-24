import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hora-certa.thiago2013ventura.chatgpt.site'),
  title: 'Hora Certa — Seu remédio, sempre na hora certa',
  description:
    'Alarmes exatos, lembretes inteligentes e acompanhamento da sua rotina de medicamentos no Android.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hora Certa — Seu remédio, sempre na hora certa',
    description:
      'Alarmes exatos, lembretes inteligentes e acompanhamento da sua rotina de medicamentos.',
    url: '/',
    siteName: 'Hora Certa',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1586, height: 992, alt: 'Aplicativo Hora Certa' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hora Certa — Seu remédio, sempre na hora certa',
    description: 'Lembretes de medicamentos para Android.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
