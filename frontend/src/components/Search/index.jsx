import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SearchPanel from '../SearchPanel';
import SearchResults from '../SearchResults';
import { useSearch } from '../../context/SearchContext';
import { useMutation } from '@tanstack/react-query';
import { searchJobs } from '../../utils/jobs';

export default function Search() {
  const { jobs, searchParams } = useSearch();

  const searchJobsMutation = useMutation({
    mutationFn: searchJobs,
  });

  React.useEffect(() => {
    searchJobsMutation.mutate(searchParams);
  }, []);

  console.log(searchJobsMutation, 'searchJobsMutation');

  const jobsLen =
    searchJobsMutation?.isSuccess && searchJobsMutation?.data?.length;

  return (
    <Stack spacing={2}>
      <Typography variant='span'>Found {jobsLen} job(s)</Typography>
      <Grid container spacing={2}>
        <Grid size={5}>
          <SearchPanel />
        </Grid>
        <Grid size={7}>
          {searchJobsMutation.isPending && 'Loading...'}
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
