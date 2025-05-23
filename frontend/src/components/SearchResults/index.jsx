import React from 'react';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import JobCard from '../JobCard';

export default function SearchResults({ jobs }) {
  return (
    <Paper>
      <Stack spacing={2}>
        {jobs?.map((props) => (
          <JobCard key={props._id} {...props} />
        ))}
      </Stack>
    </Paper>
  );
}
