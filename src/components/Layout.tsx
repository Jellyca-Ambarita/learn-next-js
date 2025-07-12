// components/Layout.tsx
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DarkModeToggle from './DarkModeToggle';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Box sx={{ backgroundColor: darkMode ? '#121212' : '#f4f9fd', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Health & Hydration Tracker
          </Typography>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
