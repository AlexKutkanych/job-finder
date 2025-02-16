import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import countries from '../../mock/countries';
import { useSearch } from '../../context/SearchContext';

const defaultCity = [{ id: 'all', label: 'All cities' }];

export default function CountryCitySearch({
  values,
  handleChange,
  showCitySelect = false,
}) {
  const [search, setSearch] = useState(values);
  const [disableCities, setDisableCities] = useState(!showCitySelect);

  const { cities, setCities } = useSearch();

  useEffect(() => {
    setSearch((state) => ({ ...state, ...values }));
  }, [values]);

  console.log(cities, 'cities');

  const onChange = (event) => {
    const { name, value } = event.target;
    setSearch((state) => ({
      ...state,
      [name]: value,
    }));

    if (name === 'jobCountry') {
      setDisableCities(value === 'all');
      filterCities(value);
      handleChange({ ...search, [name]: value, jobCity: 'all' });
    } else {
      handleChange({ ...search, [name]: value });
    }
  };

  const filterCities = (countryId) => {
    const selectedCountry = countries.find(({ id }) => id === countryId);
    setCities(selectedCountry.cities || defaultCity);
    setSearch((state) => ({
      ...state,
      jobCity: 'all',
    }));
  };

  return (
    <Stack sx={{ textAlign: 'left' }}>
      {showCitySelect ? (
        <InputLabel variant='standard' id='job-country'>
          Select location
        </InputLabel>
      ) : null}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        useFlexGap
        sx={{
          width: { xs: '100%' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Select
          id='job-country'
          labelId='job-country'
          value={search?.jobCountry || 'all'}
          name='jobCountry'
          onChange={onChange}
          sx={{
            minWidth: showCitySelect ? 'auto' : 200,
            flexBasis: '50%',
            height: '40px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          {countries?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {showCitySelect ? (
          <Select
            id='job-city'
            value={search?.jobCity || 'all'}
            name='jobCity'
            onChange={onChange}
            disabled={disableCities}
            sx={{ flexBasis: '50%', height: '40px', textAlign: 'left' }}
          >
            {cities?.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        ) : null}
      </Stack>
    </Stack>
  );
}
