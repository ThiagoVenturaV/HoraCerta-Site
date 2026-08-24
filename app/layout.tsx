import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hora Certa — Seu remédio, sempre na hora certa',
  description:
    'Alarmes exatos, lembretes inteligentes e acompanhamento da sua rotina de medicamentos no Android.',
  openGraph: {
    title: 'Hora Certa — Seu remédio, sempre na hora certa',
    description:
      'Alarmes exatos, lembretes inteligentes e acompanhamento da sua rotina de medicamentos.',
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
