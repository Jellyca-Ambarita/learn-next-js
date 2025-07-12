'use client';

import { Typography, Switch, Box } from '@mui/material';

const DarkModeToggle = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      onClick={(e) => e.stopPropagation()} // mencegah menu langsung close
    >
      <Typography variant="body2" color="inherit">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </Typography>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
    </Box>
  );
};

export default DarkModeToggle;
