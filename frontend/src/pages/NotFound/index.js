import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <img
        width='300px'
        src={`${process.env.PUBLIC_URL}/assets/not-found.jpg`}
        alt='Logo'
      />
      <Typography variant='h4'>404 Page Not Found</Typography>
      <Typography variant='body1'>
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
