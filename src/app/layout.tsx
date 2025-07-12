'use client';

import { usePathname } from 'next/navigation';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { Box } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <html lang="id">
      <body>
        <DarkModeProvider>
          {/* ✅ Logo muncul hanya jika bukan halaman utama */}
          {!isHome && (
            <Box
              sx={{
                position: 'fixed',
                top: 32,
                left: 16,
                zIndex: 999,
                width: 70,
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.08)',
                  cursor: 'pointer',
                },
              }}
            >
              <a href="/">
                <img
                  src="/images/logo.png"
                  alt="Logo HealthYou"
                  style={{
                    width: '68px',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
                  }}
                />
              </a>
            </Box>
          )}

          {/* ✅ Konten halaman */}
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
