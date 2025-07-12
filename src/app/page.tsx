'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useDarkMode } from '@/context/DarkModeContext';

/* ───────── animations ───────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

/* ───────── styled helpers ───────── */
const BackgroundContainer = styled(Box, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  padding: theme.spacing(6, 2, 4),
  background: darkMode
    ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
    : 'linear-gradient(135deg,#4682A9,#749BC2)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1.5, 3),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out`,
  maxWidth: 720,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 360,
  },
}));

const Title = styled(Typography, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  fontWeight: 800,
  fontSize: 'clamp(2.2rem,7vw,3.6rem)',
  marginBottom: theme.spacing(2),
  color: darkMode ? '#fafafa' : '#fff',
  textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
}));

const Subtitle = styled(Typography, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  fontSize: '1.1rem',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  maxWidth: 520,
  color: darkMode ? '#e0e0e0' : '#f4f4f4',
  textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
    maxWidth: 340,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  fontSize: 14,
  borderRadius: 30,
  textTransform: 'none',
  fontWeight: 600,
  color: '#fff',
  backgroundColor: '#f0c420',
  boxShadow: '0 4px 14px rgba(240,196,32,0.4)',
  '&:hover': {
    backgroundColor: '#e6b800',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: 13,
    padding: theme.spacing(1.2, 0),
  },
}));

const FooterText = styled(Typography, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  position: 'fixed',
  bottom: theme.spacing(1.5),
  left: 0,
  right: 0,
  fontSize: '0.82rem',
  color: darkMode ? '#eeeeee' : '#fdfdfd',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  pointerEvents: 'none',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

/* ───────── component ───────── */
export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { darkMode } = useDarkMode();

  /* lock scroll hanya di client side */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <BackgroundContainer darkMode={darkMode}>
      <ContentWrapper>
        {/* logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 1.5 : 2 }}>
          <Box
            sx={{
              width: isMobile ? 96 : 120,
              height: isMobile ? 96 : 120,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              transition: '.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                cursor: 'pointer',
              },
            }}
          >
            <Image src="/images/logo.png" alt="Logo HealthYou" fill style={{ objectFit: 'cover' }} priority />
          </Box>
        </Box>

        {/* heading */}
        <Title variant="h1" darkMode={darkMode}>Selamat Datang 👋</Title>
        <Subtitle variant="h6" darkMode={darkMode}>
          di <strong>HealthYou</strong>, sahabat Anda dalam hidup sehat dan terhidrasi 🌿
        </Subtitle>

        {/* CTA */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm="auto">
            <StyledButton component={NextLink} href="/dashboard" variant="contained" fullWidth={isMobile}>
              Masuk
            </StyledButton>
          </Grid>
        </Grid>
      </ContentWrapper>

      <FooterText darkMode={darkMode}>© 2025 — HealthYou. Tetap sehat, tetap terhidrasi.</FooterText>
    </BackgroundContainer>
  );
}
