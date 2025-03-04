import React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchField({ handleChange, jobSearch = '' }) {
  return (
    <TextField
      id='job-search'
      hiddenLabel
      size='small'
      variant='outlined'
      aria-label='Enter your dream job'
      placeholder='Your desired job'
      fullWidth
      slotProps={{
        htmlInput: {
          autoComplete: 'off',
          'aria-label': 'Enter your dream job',
        },
      }}
      name='jobSearch'
      value={jobSearch || ''}
      onChange={handleChange}
    />
  );
}
