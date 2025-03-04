import React from 'react';
import Button from '@mui/material/Button';

export default function ActionButton({
  label,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  onClick,
  ...rest
}) {
  return (
    <Button
      variant={variant}
      color={color}
      size='small'
      sx={{ minWidth: '90px' }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {label}
    </Button>
  );
}
