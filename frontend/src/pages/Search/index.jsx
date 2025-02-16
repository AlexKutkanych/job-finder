import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SearchPanel from '../../components/SearchPanel';
import SearchResults from '../../components/SearchResults';
import { useSearch } from '../../context/SearchContext';
import { searchJobs } from '../../utils/jobs';
import Loader from '../../components/Loader';

export default function Search() {
  const { searchParams, setSearchParams } = useSearch();

  const searchJobsMutation = useMutation({
    mutationFn: searchJobs,
  });

  const onSubmit = (params) => {
    searchJobsMutation.mutate(params);
    setSearchParams(params);
  };

  React.useEffect(() => {
    onSubmit(searchParams);
  }, []);

  console.log(searchJobsMutation, 'searchJobsMutation');

  const jobsLen =
    searchJobsMutation?.isSuccess && searchJobsMutation?.data?.length;

  return (
    <Stack spacing={2}>
      <Typography variant='span'>Found {jobsLen} job(s)</Typography>
      <Grid container spacing={2}>
        <Grid size={5}>
          <SearchPanel
            onSubmit={onSubmit}
            isLoading={searchJobsMutation?.isPending}
          />
        </Grid>
        <Grid size={7}>
          {searchJobsMutation.isPending ? <Loader /> : null}
          {searchJobsMutation.isSuccess ? (
            jobsLen ? (
              <SearchResults jobs={searchJobsMutation?.data} />
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
            )
          ) : null}
          {searchJobsMutation.isError ? 'Error' : null}
        </Grid>
      </Grid>
    </Stack>
  );
}
