import React from 'react';
import Button from '@mui/material/Button';

export default function SearchButton({ label, isLoading }) {
  return (
    <Button
      variant='contained'
      color='primary'
      size='small'
      type='submit'
      sx={{ minWidth: '90px' }}
      loading={isLoading}
      loadingIndicator='Loading…'
    >
      {label}
    </Button>
  );
}
