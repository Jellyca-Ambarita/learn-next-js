'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import { useDarkMode } from '@/context/DarkModeContext';

const API_URL = 'https://685d194e769de2bf085f55ed.mockapi.io/Auth';

// ✅ GANTI jadi $darkmode
const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$darkmode',
})<{ $darkmode: boolean }>(({ theme, $darkmode }) => ({
  minHeight: '100vh',
  background: $darkmode
    ? 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)'
    : 'linear-gradient(135deg, #4682A9, #749BC2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  transition: 'background 0.5s ease',
}));

const AuthCardBase = styled(Card, {
  shouldForwardProp: (prop) => prop !== '$darkmode',
})<{ $darkmode: boolean }>(({ theme, $darkmode }) => ({
  width: '100%',
  maxWidth: '420px',
  padding: theme.spacing(4),
  backgroundColor: $darkmode ? 'rgba(44, 62, 80, 0.9)' : '#ffffff',
  color: $darkmode ? '#f0f0f0' : '#000',
  borderRadius: '20px',
  border: $darkmode ? '1px solid #2c3e50' : '1px solid #ddd',
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

export default function DaftarPage() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      router.push('/dashboard');
    } catch (err) {
      alert('Gagal daftar. Coba lagi.');
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
    <Background $darkmode={darkMode}>
      <Link href="/dashboard">
        <GlowIcon>
          <HomeIcon />
        </GlowIcon>
      </Link>

      <AuthCardBase
        $darkmode={darkMode}
        sx={{
          boxShadow: darkMode
            ? '0 0 20px rgba(255,255,255,0.1)'
            : '0 8px 24px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Daftar akun baru
        </Typography>

        <Box component="form" onSubmit={handleRegister} mt={2}>
          <TextField
            label="Nama"
            name="name"
            value={formData.name}
            onChange={handleInput}
            fullWidth
            margin="normal"
            required
            InputProps={{ style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
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
            Daftar
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={3}>
          Sudah punya akun?{' '}
          <Link
            href="/auth/login"
            style={{
              color: darkMode ? '#90caf9' : '#4682A9',
              fontWeight: 'bold',
            }}
          >
            Login di sini
          </Link>
        </Typography>
      </AuthCardBase>
    </Background>
  );
}
