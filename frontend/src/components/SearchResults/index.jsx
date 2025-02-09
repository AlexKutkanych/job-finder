import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import JobCard from '../JobCard';

export default function SearchResults({ jobs }) {
  return (
    <Paper>
      <Stack spacing={2}>
        {jobs?.map((props) => (
          <JobCard key={props.id} {...props} />
        ))}
      </Stack>
    </Paper>
  );
}
