import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, Box, Typography } from '@mui/material';

const RestaurantIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: '8px', color: '#90caf9' }}
    aria-hidden="true"
  >
    <path d="M6 2v20" />
    <path d="M18 2v20" />
    <path d="M6 6h12" />
    <path d="M6 10h12" />
    <path d="M6 14h12" />
    <path d="M6 18h12" />
  </svg>
);

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== '$darkMode',
})<{ $darkMode: boolean }>(({ theme, $darkMode }) => ({
  backgroundColor: $darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  color: '#fff',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  marginBottom: theme.spacing(2),
}));

interface NutritionCardProps {
  title: string;
  description: string;
  darkMode: boolean;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ title, description, darkMode }) => {
  return (
    <StyledCard $darkMode={darkMode}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <RestaurantIcon />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="#ccc">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default NutritionCard;
