import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import countries from '../../mock/countries';

const StyledForm = styled('form')(({ theme }) => ({
  width: '80%',
}));

export default function SearchForm() {
  const [search, setSearch] = useState({ jobCountry: 'all', jobSearch: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    console.log(event);
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search, 'searching...');
    setIsLoading(true);
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        useFlexGap
        sx={{ pt: 2, width: { xs: '100%' } }}
      >
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
          value={search.jobSearch || ''}
          onChange={handleChange}
        />

        <Select
          labelId='demo-simple-select-label'
          id='job-country'
          value={search.jobCountry || 'all'}
          name='jobCountry'
          onChange={handleChange}
          sx={{ minWidth: '150px', height: '40px' }}
        >
          {countries.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant='contained'
          color='primary'
          size='small'
          type='submit'
          sx={{ minWidth: '90px' }}
          loading={isLoading}
          loadingIndicator='Loading…'
        >
          Search
        </Button>
      </Stack>
    </StyledForm>
  );
}
