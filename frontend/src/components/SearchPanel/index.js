import React, { useState } from 'react';
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

const initialSearch = {
  jobCountry: 'all',
  jobCity: 'all',
  jobSearch: '',
  visa: 'unknown',
  jobField: 'all',
};

export default function SearchPanel(props) {
  const [search, setSearch] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    console.log(event);
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
    setIsLoading(false);
  };

  const handleCountryChange = (values) => {
    setSearch((state) => ({
      ...state,
      ...values,
    }));
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search, 'searching...');
    setIsLoading(true);
  };

  const handleClear = () => {
    setSearch(initialSearch);
    setIsLoading(false);
  };

  return (
    <Item>
      <form onSubmit={handleSearch}>
        <Stack spacing={2}>
          <Typography variant='span' sx={{ textAlign: 'left' }}>
            Search Job:
          </Typography>
          <SearchField
            handleChange={handleChange}
            jobSearch={search.jobSearch}
          />
          <CountryCitySearch
            handleChange={handleCountryChange}
            values={{
              jobCountry: search?.jobCountry,
              jobCity: search?.jobCity,
            }}
            showCitySelect
          />
          <SearchSelect
            id='visa'
            label='Visa'
            options={visaOptions}
            onChange={handleChange}
            value={search?.visa || 'unknown'}
          />
          <SearchSelect
            id='jobField'
            label='Job Field'
            options={jobFields}
            onChange={handleChange}
            value={search?.jobField || 'all'}
          />
          <SearchButton label='Search' isLoading={isLoading} />
          <ActionButton label='Clear' variant='outline' onClick={handleClear} />
        </Stack>
      </form>
    </Item>
  );
}
