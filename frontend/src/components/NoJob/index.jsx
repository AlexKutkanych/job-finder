import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function NoJob() {
  return (
    <Typography>
      Job not found! Go back to <Link to='/search'>Search page</Link>
    </Typography>
  );
}
