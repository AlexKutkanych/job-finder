import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchPanel from '../SearchPanel';
import SearchResults from '../SearchResults';
import { useSearch } from '../../context/SearchContext';
import { useMutation } from '@tanstack/react-query';
import { searchJobs } from '../../utils/jobs';

export default function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
