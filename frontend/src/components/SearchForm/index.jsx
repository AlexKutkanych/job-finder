import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import SearchField from '../SearchField';
import CountryCitySearch from '../CountryCitySearch';
import SearchButton from '../SearchButton';
import { useSearch } from '../../context/SearchContext';

const StyledForm = styled('form')(({ theme }) => ({
  width: '80%',
}));

export default function SearchForm() {
  const { searchParams, setSearchParams, isLoading } = useSearch();
  const navigate = useNavigate();

  const handleCountryChange = (values) => {
    setSearchParams((state) => ({
      ...state,
      ...values,
    }));
  };

  const handleChange = (event) => {
    setSearchParams((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        useFlexGap
        sx={{ pt: 2, width: { xs: '100%' } }}
      >
        <SearchField
          handleChange={handleChange}
          jobSearch={searchParams?.jobSearch}
        />
        <CountryCitySearch
          values={searchParams}
          handleChange={handleCountryChange}
        />
        <SearchButton label='Search' isLoading={isLoading} />
      </Stack>
    </StyledForm>
  );
}
