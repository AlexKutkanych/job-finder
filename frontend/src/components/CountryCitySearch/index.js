import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import countries from '../../mock/countries';

const defaultCities = [{ id: 'all', label: 'All cities' }];

export default function CountryCitySearch({
  values,
  handleChange,
  showCitySelect = false,
}) {
  const [search, setSearch] = useState(values);
  const [cities, setCities] = useState(defaultCities);
  const [disableCities, setDisableCities] = useState(true);

  useEffect(() => {
    setSearch((state) => ({ ...state, ...values }));
  }, [values]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setSearch((state) => ({
      ...state,
      [name]: value,
    }));

    if (name === 'jobCountry' && showCitySelect) {
      setDisableCities(value === 'all');
      filterCities(value);
      handleChange({ ...search, [name]: value, jobCity: 'all' });
    } else {
      handleChange({ ...search, [name]: value });
    }
  };

  const filterCities = (countryId) => {
    const selectedCountry = countries.find(({ id }) => id === countryId);
    setCities(selectedCountry.cities || defaultCities);
    setSearch((state) => ({
      ...state,
      jobCity: 'all',
    }));
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      useFlexGap
      sx={{ width: { xs: '100%' } }}
    >
      <Select
        id='job-country'
        value={search?.jobCountry || 'all'}
        name='jobCountry'
        onChange={onChange}
        sx={{
          minWidth: '150px',
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
          sx={{ minWidth: '150px', height: '40px', textAlign: 'left' }}
        >
          {cities?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </Stack>
  );
}
