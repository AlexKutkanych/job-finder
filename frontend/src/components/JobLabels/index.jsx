import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function JobLabels({ labels = [] }) {
  return (
    <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
      {labels.reduce((acc, item, i) => {
        if (!item) return acc;
        acc.push(
          <Chip key={item} label={item} color='primary' variant='outlined' />
        );
        return acc;
      }, [])}
    </Stack>
  );
}
