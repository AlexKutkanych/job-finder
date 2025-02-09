import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import countries from '../../mock/countries';
import SearchField from '../SearchField';
import CountryCitySearch from '../CountryCitySearch';
import SearchButton from '../SearchButton';

const StyledForm = styled('form')(({ theme }) => ({
  width: '80%',
}));

export default function SearchForm() {
  const [search, setSearch] = useState({ jobCountry: 'all', jobSearch: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (values) => {
    setSearch((state) => ({
      ...state,
      ...values,
    }));
  };

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
        <SearchField handleChange={handleChange} jobSearch={search.jobSearch} />
        <CountryCitySearch values={search} handleChange={handleCountryChange} />
        <SearchButton label='Search' isLoading={isLoading} />
      </Stack>
    </StyledForm>
  );
}
