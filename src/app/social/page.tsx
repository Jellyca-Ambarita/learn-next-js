'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useDarkMode } from '@/context/DarkModeContext';

/* -------------------- styled components -------------------- */
const Background = styled(Box, { shouldForwardProp: p => p !== '$dark' })<{ $dark: boolean }>(({ theme, $dark }) => ({
  minHeight: '100vh',
  background: $dark ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)' : 'linear-gradient(135deg,#293d5e,#5f84c7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(10, 2, 6),
  position: 'relative',
}));

const SocialCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(14px)',
  borderRadius: 20,
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: 600,
  color: '#fff',
  boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

/* -------------------- constants -------------------- */
const gold = '#FFD700';

const glow = {
  boxShadow: `0 0 6px ${gold}, 0 0 12px ${gold}55`,
};

const templateMessages = [
  'Aku baru saja mulai hidup sehat bareng HealthYou 🌿💧 #HidupSehat',
  'Hari ini aku minum 8 gelas air! Thanks to HealthYou 💪 #HidrasiItuPenting',
  'Tips tidur sehatku dari HealthYou benar-benar membantu! 📌✨',
  'Ayo hidup lebih sehat mulai hari ini! Coba HealthYou juga! 🚀 #HealthYouChallenge',
  'Kamu harus coba HealthYou! Aplikasi pelacak hidup sehat terbaik! 📱💚',
];

const emojiList = ['😊', '🥰', '💪', '🚀', '💧', '🌿', '✨', '📌', '📱', '💚'];

interface Post { text: string; image?: string }

export default function Social() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [messages, setMessages] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string>();
  const [showEmoji, setShowEmoji] = useState(false);
  const [navEl, setNavEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') router.replace('/auth/login');
    else setCheckingLogin(false);
  }, [router]);

  const handlePost = () => {
    if (!input.trim()) return;
    setMessages([{ text: input, image }, ...messages]);
    setInput('');
    setImage(undefined);
    setShowEmoji(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const shareMsg = (m: string) => {
    const url = 'https://healthyou.vercel.app';
    const full = `${m} — Dibagikan dari HealthYou ${url}`;
    if (navigator.share) navigator.share({ title: 'HealthYou', text: full, url }).catch(() => {});
    else {
      navigator.clipboard.writeText(full);
      alert('Pesan disalin ke clipboard');
    }
  };

  const waUrl = (m: string) => `https://wa.me/?text=${encodeURIComponent(m)}%20https://healthyou.vercel.app`;
  const fbUrl = (m: string) => `https://www.facebook.com/sharer/sharer.php?u=https://healthyou.vercel.app&quote=${encodeURIComponent(m)}`;

  if (checkingLogin) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;

  return (
    <Background $dark={darkMode}>
      {/* fixed navbar */}
      <Box sx={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 1, zIndex: 1000 }}>
        <Link href="/dashboard">
          <IconButton sx={{ color: gold, border: `1px solid ${gold}`, bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)', ...glow } }}>
            <HomeIcon fontSize="small" />
          </IconButton>
        </Link>
        <IconButton onClick={(e) => setNavEl(e.currentTarget)} sx={{ color: gold, border: `1px solid ${gold}`, bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)', ...glow } }}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <Menu anchorEl={navEl} open={Boolean(navEl)} onClose={() => setNavEl(null)} PaperProps={{
          sx: {
            background: darkMode ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)' : 'linear-gradient(135deg,#749BC2,#A9C4EB)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }
        }}>
          {[
            { label: 'Data Diri', href: '/profile' },
            { label: 'Notifikasi Kesehatan', href: '/Reminders' },
            { label: 'Menu Sehat', href: '/Nutrition' },
          ].map(({ label, href }) => (
            <MenuItem key={href} onClick={() => setNavEl(null)}>
              <Link href={href} style={{ color: gold, textDecoration: 'none' }}>{label}</Link>
            </MenuItem>
          ))}
          <MenuItem onClick={() => { toggleDarkMode(); setNavEl(null); }}>
  <Box sx={{ color: gold, display: 'flex', alignItems: 'center' }}>
    <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  </Box>
</MenuItem>

        </Menu>
      </Box>

      {/* content */}
      <SocialCard>
        <Typography variant="h4" fontWeight={700} textAlign="center">HealthYou</Typography>
        <Typography variant="body2" textAlign="center" mb={2}>Bagikan pengalaman sehatmu dan ajak orang lain bergaya hidup sehat ✨</Typography>

        <Typography variant="subtitle1" fontWeight={600}>Pilih template:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {templateMessages.map(t => (
            <Chip key={t} label={t.length > 35 ? `${t.slice(0, 35)}...` : t} clickable onClick={() => setInput(t)} sx={{ color: '#fff', borderColor: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }} variant="outlined" />
          ))}
        </Box>

        <TextField
          fullWidth
          label="Tulis pengalamanmu"
          value={input}
          onChange={e => setInput(e.target.value)}
          multiline
          rows={isMobile ? 3 : 2}
          InputLabelProps={{ sx: { color: '#fff' } }}
          InputProps={{
            sx: {
              color: '#fff',
              '& fieldset': { borderColor: '#fff' },
              '&:hover fieldset': { borderColor: '#fff' },
              '&.Mui-focused fieldset': { borderColor: '#fff' },
            },
          }}
        />
        {image && <Box component="img" src={image} alt="preview" sx={{ width: '100%', borderRadius: 2, mt: 1, maxHeight: 250, objectFit: 'cover' }} />}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
          <Box>
            <Tooltip title="Emoji"><IconButton onClick={() => setShowEmoji(v => !v)}><EmojiEmotionsIcon sx={{ color: '#fff' }} /></IconButton></Tooltip>
            <Tooltip title="Gambar"><IconButton component="label"><ImageIcon sx={{ color: '#fff' }} /><input hidden type="file" accept="image/*" onChange={handleImageUpload} /></IconButton></Tooltip>
          </Box>
          <Button onClick={handlePost} variant="contained" size="small" sx={{ fontWeight: 600, px: 3 }}>Kirim</Button>
        </Box>

        {showEmoji && (
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: darkMode ? '#333' : '#eee', display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 360, mb: 2 }}>
            {emojiList.map(e => (<Button key={e} onClick={() => setInput(input + e)} size="small" sx={{ minWidth: 32, fontSize: 18 }}>{e}</Button>))}
          </Box>
        )}

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

        {messages.length === 0 ? (
          <Typography variant="body2" textAlign="center">Belum ada postingan.</Typography>
        ) : (
          <List>
            {messages.map((m, i) => (
              <ListItem key={i} alignItems="flex-start" divider>
                {m.image && <ListItemAvatar><Avatar variant="rounded" src={m.image} sx={{ width: 56, height: 56, mr: 2 }} /></ListItemAvatar>}
                <ListItemText primary={m.text} />
                <Tooltip title="WhatsApp"><IconButton component="a" href={waUrl(m.text)} target="_blank"><WhatsAppIcon color="success" /></IconButton></Tooltip>
                <Tooltip title="Facebook"><IconButton component="a" href={fbUrl(m.text)} target="_blank"><FacebookIcon color="primary" /></IconButton></Tooltip>
                <Tooltip title="Bagikan"><IconButton onClick={() => shareMsg(m.text)}><ShareIcon sx={{ color: '#fff' }} /></IconButton></Tooltip>
              </ListItem>
            ))}
          </List>
        )}
      </SocialCard>
    </Background>
  );
}
