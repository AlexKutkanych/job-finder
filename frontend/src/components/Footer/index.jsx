import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import navItems from '../../mock/navItems';
import Socials from '../Socials';
import Copyright from '../Copyright';

export default function Footer() {
  return (
    <>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 4 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 1,
            }}
          >
            {navItems.map(({ id, url, label }) => (
              <Button
                key={id}
                to={url}
                component={Link}
                variant='text'
                color='info'
                size='small'
              >
                {label}
              </Button>
            ))}
          </Box>
          <Socials />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
