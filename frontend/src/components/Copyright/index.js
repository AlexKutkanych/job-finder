import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color='text.secondary' href='/'>
        JobSearch
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}
