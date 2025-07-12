'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  IconButton,
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, keyframes } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

const API_URL = 'https://6861efad96f0cc4e34b7d2dc.mockapi.io/profile';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

const glowEffect = { boxShadow: '0 0 12px 3px rgba(255,215,0,.75)' };

const StyledBackground = styled(Box, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  minHeight: '100vh',
  background: darkMode
    ? 'linear-gradient(135deg,#0d1d26,#192f3f,#2e4a60)'
    : 'linear-gradient(135deg,#24385f,#4f70cc)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(10),
  overflowY: 'auto',
  position: 'relative',
}));

const baseGlass = {
  backgroundColor: 'rgba(255,255,255,.15)',
  backdropFilter: 'blur(22px)',
  color: '#fff',
  boxShadow: '0 18px 46px rgba(0,0,0,.4)',
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...baseGlass,
  borderRadius: 28,
  padding: theme.spacing(4),
  animation: `${fadeIn} .6s ease-out`,
  width: '100%',
  maxWidth: 600,          // ➜ form lebih lebar
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': { color: '#eee', fontSize: '1.05rem' },
  '& input': { color: '#fff', fontSize: '1.1rem' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#bbb' },
    '&:hover fieldset': { borderColor: '#fff' },
    '&.Mui-focused fieldset': { borderColor: '#ffd700' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.4),
  borderRadius: 32,
  fontSize: '1.05rem',
  textTransform: 'none',
  fontWeight: 700,
  backgroundColor: '#ffd700',
  color: '#000',
  '&:hover': { backgroundColor: '#e5ba00' },
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  ...baseGlass,
  borderRadius: 28,
  padding: theme.spacing(8, 6),
  width: '100%',
  maxWidth: 680,          // ➜ background kartu diperbesar
  animation: `${fadeIn} .8s ease-out`,
  transition: 'transform .3s, box-shadow .3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 28px 64px rgba(0,0,0,.45)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 3),
  },
}));

export default function Profile() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:600px)');

  const [form, setForm] = useState({ name: '', age: '', height: '', weight: '', avatar: '' });

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/auth/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  const fetchProfiles = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProfiles(data);
    setShowForm(data.length === 0);
  };

  useEffect(() => {
    if (mounted) fetchProfiles();
  }, [mounted]);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', age: '', height: '', weight: '', avatar: '' });
    setEditingId(null);
    setShowForm(false);
    fetchProfiles();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProfiles();
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm({ ...form, avatar: URL.createObjectURL(file) });
  };

  if (!mounted) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;

  return (
    <StyledBackground darkMode={darkMode}>
      <CssBaseline />

      {/* TOP BAR */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 1 }}>
        <IconButton component={NextLink} href="/dashboard" sx={{ color: '#FFD700', border: '1px solid #FFD700', backgroundColor: 'rgba(255,255,255,.15)', borderRadius: '50%', transition: '.3s', '&:hover': { backgroundColor: 'rgba(255,255,255,.25)', ...glowEffect } }}>
          <HomeIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ color: '#FFD700', border: '1px solid #FFD700', backgroundColor: 'rgba(255,255,255,.15)', borderRadius: '50%', transition: '.3s', '&:hover': { backgroundColor: 'rgba(255,255,255,.25)', ...glowEffect } }}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { background: darkMode ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)' : 'linear-gradient(135deg,#6f95d3,#9fb9ec)', backdropFilter: 'blur(14px)', borderRadius: 2, border: '1px solid rgba(255,255,255,.25)', color: '#FFD700' } }}>
          {[{ label: 'Notifikasi Kesehatan', href: '/Reminders' }, { label: 'Menu Sehat', href: '/Nutrition' }, { label: 'Media Sosial', href: '/social' }].map(item => (
            <MenuItem key={item.href} onClick={() => setAnchorEl(null)}>
              <NextLink href={item.href} style={{ textDecoration: 'none', color: '#FFD700', width: '100%' }}>{item.label}</NextLink>
            </MenuItem>
          ))}
          <MenuItem disableRipple disableGutters>
            <FormControlLabel sx={{ ml: 1, color: '#FFD700' }} label={darkMode ? 'Dark Mode' : 'Light Mode'} control={<Switch checked={darkMode} onChange={() => { toggleDarkMode(); setAnchorEl(null); }} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#FFD700' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FFD700' } }} />} />
          </MenuItem>
        </Menu>
      </Box>

      {/* HEADING */}
      <Typography variant="h4" fontWeight={800} color="#fff" mb={3} textAlign="center">Data Diri</Typography>
      
      {showForm && (
        <Container maxWidth="sm" sx={{ px: 2, mb: 4 }}>
          <StyledPaper>
            <StyledTextField label="Nama" name="name" value={form.name} fullWidth onChange={handleChange} />
            <StyledTextField label="Usia" name="age" value={form.age} fullWidth onChange={handleChange} />
            <StyledTextField label="Tinggi Badan (cm)" name="height" value={form.height} fullWidth onChange={handleChange} />
            <StyledTextField label="Berat Badan (kg)" name="weight" value={form.weight} fullWidth onChange={handleChange} />
            <Button variant="outlined" component="label" fullWidth sx={{ mt: 1, color: '#fff', borderColor: '#fff' }}>
              Unggah Foto Profil
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {form.avatar && (
              <Avatar src={form.avatar} alt="Preview" sx={{ width: 120, height: 120, mt: 2, mb: 2, mx: 'auto', border: '4px solid #FFD700' }} />
            )}
            <StyledButton fullWidth onClick={handleSubmit}>{editingId ? 'Perbarui' : 'Simpan'}</StyledButton>
          </StyledPaper>
        </Container>
      )}

      {!showForm && (
        <Grid container spacing={3} justifyContent="center" sx={{ px: isMobile ? 1 : 4 }}>
          {profiles.map(profile => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={profile.id}>
              <ProfileCard>
                <Avatar src={profile.avatar || 'https://via.placeholder.com/120'} alt={profile.name} sx={{ width: 140, height: 140, mb: 2, mx: 'auto', border: '4px solid #FFD700' }} />
                <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
                <Typography>Usia: {profile.age} tahun</Typography>
                <Typography>Tinggi: {profile.height} cm</Typography>
                <Typography>Berat: {profile.weight} kg</Typography>
                <Box mt={2}>
                  <IconButton sx={{ color: '#FFD700' }} onClick={() => { setForm(profile); setEditingId(profile.id); setShowForm(true); }}><EditIcon /></IconButton>
                  <IconButton sx={{ color: '#FF4444' }} onClick={() => handleDelete(profile.id)}><DeleteIcon /></IconButton>
                </Box>
              </ProfileCard>
            </Grid>
          ))}
        </Grid>
      )}
    </StyledBackground>
  );
}
