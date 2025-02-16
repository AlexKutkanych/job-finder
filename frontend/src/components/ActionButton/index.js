import React from 'react';
import Button from '@mui/material/Button';

export default function ActionButton({
  label,
  variant = 'contained',
  disabled = false,
  onClick,
}) {
  return (
    <Button
      variant={variant}
      color='primary'
      size='small'
      sx={{ minWidth: '90px' }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
