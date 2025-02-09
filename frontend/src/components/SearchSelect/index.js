import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SearchSelect({ id, value, label, options, onChange }) {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel sx={{ textAlign: 'left' }} id={id}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        onChange={handleChange}
        name={id}
        sx={{ height: '40px', width: '100%', textAlign: 'left' }}
      >
        {options.map(({ id, value, label }) => (
          <MenuItem key={id} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
