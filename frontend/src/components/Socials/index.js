import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import socials from '../../mock/socials';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Socials() {
  return (
    <Stack
      direction='row'
      spacing={1}
      useFlexGap
      sx={{ justifyContent: 'left', color: 'text.secondary' }}
    >
      {socials.map(({ id, url }) => (
        <IconButton
          key={id}
          color='inherit'
          size='small'
          href={url}
          aria-label={id}
          sx={{ alignSelf: 'center' }}
        >
          {id === 'facebook' ? <FacebookIcon /> : <LinkedInIcon />}
        </IconButton>
      ))}
    </Stack>
  );
}
