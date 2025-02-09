import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SearchPanel from '../../components/SearchPanel';
import SearchResults from '../../components/SearchResults';
import jobs from '../../mock/jobs';

export default function Search(props) {
  return (
    <Stack spacing={2}>
      <Typography variant='span'>Found 20 jobs</Typography>
      <Grid container spacing={2}>
        <Grid size={5}>
          <SearchPanel />
        </Grid>
        <Grid size={7}>
          <SearchResults jobs={jobs} />
        </Grid>
      </Grid>
    </Stack>
  );
}
