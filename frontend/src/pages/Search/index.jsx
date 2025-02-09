import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SearchPanel from '../../components/SearchPanel';
import SearchResults from '../../components/SearchResults';
import { useSearch } from '../../context/SearchContext';

export default function Search() {
  const { jobs } = useSearch();
  const jobsLen = jobs.length;
  return (
    <Stack spacing={2}>
      <Typography variant='span'>Found {jobsLen} job(s)</Typography>
      <Grid container spacing={2}>
        <Grid size={5}>
          <SearchPanel />
        </Grid>
        <Grid size={7}>
          {jobsLen ? (
            <SearchResults jobs={jobs} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography component='p' sx={{ textAlign: 'center' }}>
                No jobs found
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
