import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchForm from '../../components/SearchForm';

export default function Home() {
  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 7, sm: 10 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant='h1'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Find&nbsp;your&nbsp;
            <Typography
              component='span'
              variant='h1'
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Dream Job
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '87%' },
            }}
          >
            Whether you are a fresh graduate looking for your first job, an
            experienced professional seeking new opportunities, or someone
            looking to switch careers, JobFinder is here to help you on your
            journey.
          </Typography>
          <SearchForm />
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ textAlign: 'center' }}
          >
            By clicking &quot;Search&quot; you agree to our&nbsp;
            <Link href='#' color='primary'>
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
