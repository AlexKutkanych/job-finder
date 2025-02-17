import React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function Snackbar({ open, setOpen, message }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <MuiSnackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
      message={message}
    >
      <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
