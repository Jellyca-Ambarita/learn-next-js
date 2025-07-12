'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebaseConfig';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import { useDarkMode } from '@/context/DarkModeContext';

const API_URL = 'https://685d194e769de2bf085f55ed.mockapi.io/Auth';

// ✅ Styled Components dengan prop `isDarkMode`
const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDarkMode',
})<{ isDarkMode: boolean }>(({ theme, isDarkMode }) => ({
  minHeight: '100vh',
  background: isDarkMode
    ? 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)'
    : 'linear-gradient(135deg, #4682A9, #749BC2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  transition: 'background 0.5s ease',
}));

const AuthCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isDarkMode',
})<{ isDarkMode: boolean }>(({ theme, isDarkMode }) => ({
  width: '100%',
  maxWidth: '420px',
  padding: theme.spacing(4),
  backgroundColor: isDarkMode ? 'rgba(44, 62, 80, 0.9)' : '#ffffff',
  color: isDarkMode ? '#f0f0f0' : '#000',
  borderRadius: '20px',
  border: isDarkMode ? '1px solid #2c3e50' : '1px solid #ddd',
  transition: 'all 0.3s ease',
}));

const GlowIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  color: '#FFD700',
  border: '1px solid #FFD700',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.9)',
    borderColor: '#f1c40f',
    color: '#f1c40f',
  },
}));

export default function LoginPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isMounted, setIsMounted] = useState(false);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.replace('/dashboard');
      setRedirected(true);
    }
  }, [router]);

  if (!isMounted || redirected) return null;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(API_URL);
      const user = res.data.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name || '');
        router.replace('/dashboard');
      } else {
        alert('Email atau password salah');
      }
    } catch (err) {
      alert('Gagal login. Coba lagi.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email ?? '');
      localStorage.setItem('userName', user.displayName ?? '');
      router.replace('/dashboard');
    } catch (error) {
      alert('Gagal login dengan Google.');
    }
  };

  const inputStyle = {
    color: darkMode ? '#ffffff' : '#000000',
    backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
  };

  const labelStyle = {
    color: darkMode ? '#bbbbbb' : '#000000',
  };

  return (
    <Background isDarkMode={darkMode}>
      <Link href="/dashboard">
        <GlowIcon>
          <HomeIcon />
        </GlowIcon>
      </Link>

      <AuthCard isDarkMode={darkMode}>
        <Typography variant="h6" align="center" gutterBottom>
          Login ke akun Anda
        </Typography>

        <Box component="form" onSubmit={handleLogin} mt={2}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            fullWidth
            margin="normal"
            required
            InputProps={{ style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInput}
            fullWidth
            margin="normal"
            required
            InputProps={{ style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: '30px', py: 1 }}
          >
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 2, borderColor: darkMode ? '#555' : '#ccc' }}>
          atau
        </Divider>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{
              borderRadius: '30px',
              textTransform: 'none',
              py: 0.7,
              fontSize: '0.85rem',
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderColor: darkMode ? '#888' : undefined,
              color: darkMode ? '#fff' : undefined,
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              width={16}
              height={16}
              style={{ display: 'block' }}
            />
            Login dengan Google
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={3}>
          Belum punya akun?{' '}
          <Link
            href="/auth/daftar"
            style={{
              color: darkMode ? '#90caf9' : '#4682A9',
              fontWeight: 'bold',
            }}
          >
            Daftar di sini
          </Link>
        </Typography>
      </AuthCard>
    </Background>
  );
}
