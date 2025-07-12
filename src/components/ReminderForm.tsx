'use client';

import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useState } from 'react';

export type ReminderData = {
  text: string;
  time: string;
  contactType: 'email' | 'whatsapp';
  contact: string;
  category: 'makan' | 'minum' | 'tidur';
};

type Props = {
  onAdd: (reminder: ReminderData) => void;
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(14px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  animation: `${fadeIn} 0.8s ease-out`,
  width: '100%',
  marginTop: theme.spacing(2),
  color: '#fff',
}));

const ReminderForm = ({ onAdd }: Props) => {
  const [formData, setFormData] = useState<ReminderData>({
    text: '',
    time: '',
    contactType: 'email',
    contact: '',
    category: 'minum',
  });

  const [error, setError] = useState('');

  const handleChange = (field: keyof ReminderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.text.trim().length < 3) {
      setError('Pengingat harus minimal 3 karakter.');
      return;
    }

    if (!formData.time || !formData.contact) {
      setError('Jam dan kontak wajib diisi.');
      return;
    }

    setError('');
    onAdd(formData);

    setFormData({
      text: '',
      time: '',
      contactType: 'email',
      contact: '',
      category: 'minum',
    });
  };

  return (
    <FormCard>
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ color: '#fff' }}>
        Tambah Pengingat
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Deskripsi */}
          <Grid item xs={12}>
            <TextField
              label="Deskripsi pengingat"
              variant="outlined"
              fullWidth
              value={formData.text}
              onChange={(e) => handleChange('text', e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* Jam Pengingat */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Jam Pengingat"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              sx={{
                '& input': {
                  color: '#fff',
                  // Edge / Firefox dark icon
                  filter: 'invert(1)',
                },
                // Chrome / Safari icon (WebKit)
                '& input::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                },
              }}
            />
          </Grid>

          {/* Jenis Pengingat */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label" sx={{ color: '#fff' }}>
                Jenis Pengingat
              </InputLabel>
              <Select
                labelId="category-label"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="makan">Makan</MenuItem>
                <MenuItem value="minum">Minum</MenuItem>
                <MenuItem value="tidur">Tidur</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Metode Kontak */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="contact-type-label" sx={{ color: '#fff' }}>
                Metode Kontak
              </InputLabel>
              <Select
                labelId="contact-type-label"
                value={formData.contactType}
                onChange={(e) => handleChange('contactType', e.target.value as 'email' | 'whatsapp')}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Kontak */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={formData.contactType === 'email' ? 'Alamat Email' : 'Nomor WhatsApp'}
              variant="outlined"
              fullWidth
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* Error */}
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          {/* Submit */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                px: 4,
                fontWeight: 'bold',
                backgroundColor: '#ffd700',
                color: '#000',
                '&:hover': { backgroundColor: '#e6c200' },
              }}
            >
              Simpan
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormCard>
  );
};

export default ReminderForm;
