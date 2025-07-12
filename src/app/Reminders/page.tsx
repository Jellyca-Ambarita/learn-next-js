'use client';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/context/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';

const MOCKAPI_URL = 'https://685d194e769de2bf085f55ed.mockapi.io/Reminders';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$darkMode',
})<{ $darkMode: boolean }>(({ theme, $darkMode }) => ({
  minHeight: '100vh',
  background: $darkMode
    ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
    : 'linear-gradient(135deg, #293d5e, #5f84c7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  flexDirection: 'column',
  position: 'relative',
  transition: 'background 0.4s ease-in-out',
}));

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$darkMode',
})<{ $darkMode: boolean }>(({ theme, $darkMode }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  color: '#fff',
  backdropFilter: 'blur(14px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 18px 38px rgba(0,0,0,0.3)',
  animation: `${fadeIn} 0.8s ease-out`,
  width: '100%',
  maxWidth: '800px',
  transition: 'background 0.4s ease-in-out, color 0.4s ease-in-out',
}));

const commonInputStyles = (darkMode: boolean) => ({
  color: darkMode ? '#fff' : undefined,
  '& .MuiInputLabel-root': {
    color: darkMode ? '#fff' : undefined,
  },
  '& .MuiOutlinedInput-root': {
    color: darkMode ? '#fff' : undefined,
    '& fieldset': {
      borderColor: darkMode ? '#fff' : undefined,
    },
    '& .MuiSvgIcon-root': {
      color: darkMode ? '#fff' : undefined,
    },
  },
});

const ReminderForm = ({ onAdd, darkMode }: { onAdd: (data: any) => void; darkMode: boolean }) => {
  const [formData, setFormData] = useState({
    text: '',
    category: '',
    time: '',
    contactType: 'email',
    contact: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      text: '',
      category: '',
      time: '',
      contactType: 'email',
      contact: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, color: darkMode ? '#fff' : undefined }}>
        Tambah Pengingat
      </Typography>

      <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Jam Pengingat"
    type="time"
    value={formData.time}
    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
    InputLabelProps={{ shrink: true, sx: { color: '#fff' } }}
    sx={{
      color: '#fff',                              // teks input
      '& .MuiOutlinedInput-root': {
        color: '#fff',                            // cursor & value
        '& fieldset': { borderColor: '#fff' },    // garis tepi
      },
    }}
    required
  />
</Grid>

  {/* Jenis Pengingat */}
<Grid item xs={12}>
  <FormControl fullWidth sx={{ color: '#fff' }}>
    <InputLabel shrink sx={{ color: '#fff' }}>
      Jenis Pengingat
    </InputLabel>
    <Select
      value={formData.category}
      label="Jenis Pengingat"
      onChange={(e) =>
        setFormData({ ...formData, category: e.target.value as string })
      }
      sx={{ color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
      required
    >
      <MenuItem value="makan">Makan</MenuItem>
      <MenuItem value="minum">Minum</MenuItem>
      <MenuItem value="tidur">Tidur</MenuItem>
    </Select>
  </FormControl>
</Grid>

{/* Deskripsi */}
<Grid item xs={12}>
  <TextField
    fullWidth
    label="Deskripsi Pengingat"
    value={formData.text}
    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
    InputLabelProps={{ shrink: true, sx: { color: '#fff' } }}
    sx={{
      color: '#fff',
      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
    }}
    required
  />
</Grid>

{/* Metode Pengingat */}
<Grid item xs={12} sm={6}>
  <FormControl fullWidth sx={{ color: '#fff' }}>
    <InputLabel shrink sx={{ color: '#fff' }}>
      Metode Pengingat
    </InputLabel>
    <Select
      value={formData.contactType}
      label="Metode Pengingat"
      onChange={(e) =>
        setFormData({ ...formData, contactType: e.target.value as string })
      }
      sx={{ color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
      required
    >
      <MenuItem value="email">Email</MenuItem>
      <MenuItem value="whatsapp">WhatsApp</MenuItem>
    </Select>
  </FormControl>
</Grid>

{/* Input kontak */}
<Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label={
      formData.contactType === 'email' ? 'Alamat Email' : 'Nomor WhatsApp'
    }
    type={formData.contactType === 'email' ? 'email' : 'tel'}
    value={formData.contact}
    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
    InputLabelProps={{ shrink: true, sx: { color: '#fff' } }}
    sx={{
      color: '#fff',
      '& .MuiOutlinedInput-root fieldset': { borderColor: '#fff' },
    }}
    required
  />
</Grid>

</Grid>


      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" color="primary" sx={{ px: 4 }}>
          SIMPAN
        </Button>
      </Box>
    </Box>
  );
};

const Reminders = () => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [reminders, setReminders] = useState<any[]>([]);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/auth/login');
    } else {
      setIsCheckingLogin(false);
    }
  }, [router]);

  useEffect(() => {
    if (!isCheckingLogin) {
      fetchReminders();
    }
  }, [isCheckingLogin]);

  const fetchReminders = async () => {
    try {
      const res = await fetch(MOCKAPI_URL);
      const data = await res.json();
      setReminders(data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  const handleAddReminder = async (data: any) => {
    try {
      const res = await fetch(MOCKAPI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newReminder = await res.json();
      setReminders((prev) => [newReminder, ...prev]);
    } catch (err) {
      console.error('Gagal menyimpan ke MockAPI:', err);
    }
  };

  const handleDelete = async (index: number) => {
    const reminderToDelete = reminders[index];
    try {
      if (reminderToDelete.id) {
        await fetch(`${MOCKAPI_URL}/${reminderToDelete.id}`, {
          method: 'DELETE',
        });
      }
      setReminders((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Gagal menghapus:', error);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (isCheckingLogin) return null;

  return (
    <Background $darkMode={darkMode}>
      <Box sx={{ position: 'fixed', top: 24, right: 24, zIndex: 1200, display: 'flex', gap: 1 }}>
        <Tooltip title="Dashboard">
          <Link href="/dashboard" passHref>
            <IconButton sx={{ color: '#ffd700', backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid #ffd700', backdropFilter: 'blur(4px)' }}>
              <HomeIcon fontSize="small" />
            </IconButton>
          </Link>
        </Tooltip>

        <Tooltip title="Menu">
          <IconButton onClick={handleMenuClick} sx={{ color: '#ffd700', backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid #ffd700', backdropFilter: 'blur(4px)' }}>
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
          sx: {
            background: darkMode
              ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
              : 'linear-gradient(135deg, #749BC2, #A9C4EB)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: 2,
            minWidth: 180,
          },
        }}>
          {[{ label: 'Data Diri', href: '/profile' }, { label: 'Menu Sehat', href: '/Nutrition' }, { label: 'Media Sosial', href: '/social' }].map((item, idx) => (
            <MenuItem key={idx} onClick={handleClose}>
              <Link href={item.href} style={{ textDecoration: 'none', color: '#ffd700', width: '100%' }}>
                {item.label}
              </Link>
            </MenuItem>
          ))}
          <MenuItem onClick={() => { toggleDarkMode(); handleClose(); }} sx={{ color: '#ffd700' }}>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </MenuItem>
        </Menu>
      </Box>

      <Card $darkMode={darkMode}>
        <Typography
  variant="h4"
  align="center"
  gutterBottom
  fontWeight={700}
  sx={{ color: '#fff' }}
>
  Pengingat Hidup Sehat 💧🍽️🥬
</Typography>

<Divider sx={{ my: 2, borderColor: '#555' }} />

<ReminderForm onAdd={handleAddReminder} darkMode={darkMode} />

<Box sx={{ mt: 4 }}>
  <Typography
    variant="h6"
    gutterBottom
    sx={{ color: '#fff', mb: 2 }}
  >
    Daftar Pengingat
  </Typography>

  {reminders.length === 0 ? (
    <Typography
      variant="body2"
      sx={{ color: '#ccc', textAlign: 'center', py: 4 }}
    >
      Belum ada pengingat yang ditambahkan.
    </Typography>
  ) : (
    <Box sx={{ borderRadius: 3, border: '1px solid #555', overflow: 'hidden' }}>
      <List disablePadding>
        {reminders.map((reminder, index) => (
          <Box key={reminder.id || index}>
            <ListItem
              secondaryAction={
                <Tooltip title="Hapus pengingat">
                  <IconButton edge="end" onClick={() => handleDelete(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              }
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography fontWeight="bold" sx={{ color: '#fff' }}>
                    {reminder.text} ({reminder.category})
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      display="flex"
                      alignItems="center"
                      sx={{ mb: 0.25, color: '#fff' }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: 16, mr: 0.5, color: '#fff' }}
                      />
                      {reminder.time}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ color: '#fff' }}>
                      Kirim ke {reminder.contactType === 'email' ? 'Email' : 'WhatsApp'}: {reminder.contact}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < reminders.length - 1 && <Divider sx={{ borderColor: '#555' }} />}
          </Box>
        ))}
      </List>
    </Box>
          )}
        </Box>
      </Card>
    </Background>
  );
};

export default Reminders;
