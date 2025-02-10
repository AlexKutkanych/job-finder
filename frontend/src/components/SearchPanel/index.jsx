import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SearchField from '../SearchField';
import CountryCitySearch from '../CountryCitySearch';
import SearchSelect from '../SearchSelect';
import visaOptions from '../../mock/visaOptions';
import SearchButton from '../SearchButton';
import ActionButton from '../ActionButton';
import jobFields from '../../mock/jobFields';
import { useSearch } from '../../context/SearchContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function SearchPanel() {
  const {
    initialSearchParams,
    searchParams,
    setSearchParams,
    resetSearchParams,
    searchJobs,
    isLoading,
  } = useSearch();

  const handleChange = (event) => {
    setSearchParams((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCountryChange = (values) => {
    setSearchParams((state) => ({
      ...state,
      ...values,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchParams, 'searching...');
    searchJobs(searchParams);
  };

  const handleClear = () => {
    resetSearchParams();
    searchJobs(initialSearchParams);
  };

  return (
    <Item>
      <form onSubmit={handleSearch}>
        <Stack spacing={2}>
          <Typography variant='span' sx={{ textAlign: 'left' }}>
            Search Jobs:
          </Typography>
          <SearchField
            handleChange={handleChange}
            jobSearch={searchParams?.jobSearch}
          />
          <CountryCitySearch
            handleChange={handleCountryChange}
            values={{
              jobCountry: searchParams?.jobCountry,
              jobCity: searchParams?.jobCity,
            }}
            showCitySelect
          />
          <SearchSelect
            id='visa'
            label='Visa'
            options={visaOptions}
            onChange={handleChange}
            value={searchParams?.visa || 'unknown'}
          />
          <SearchSelect
            id='jobField'
            label='Job Field'
            options={jobFields}
            onChange={handleChange}
            value={searchParams?.jobField || 'all'}
          />
          <SearchButton label='Search' isLoading={isLoading} />
          <ActionButton label='Clear' variant='outline' onClick={handleClear} />
        </Stack>
      </form>
    </Item>
  );
}
