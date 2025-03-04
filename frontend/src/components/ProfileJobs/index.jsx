import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Link, List, ListItem } from '@mui/material';
import ActionButton from '../ActionButton';

export default function ProfileJobs({ title, jobs = [], removeFromBookmarks }) {
  return (
    <>
      <Typography>{title}</Typography>
      <Card>
        <CardContent sx={{ textAlign: 'left' }}>
          {jobs?.length ? (
            <List>
              {jobs.map(({ _id, title, location, company }) => (
                <ListItem sx={{ columnGap: 2 }}>
                  <Link
                    href={`/job/${_id}`}
                    variant='body1'
                    sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    {title}
                  </Link>
                  <Typography component='p'>
                    {location?.city}, {location?.country}
                  </Typography>
                  <Typography component='p'>{company?.name}</Typography>
                  {removeFromBookmarks ? (
                    <ActionButton
                      onClick={() => removeFromBookmarks(_id)}
                      label='remove'
                      size='small'
                      variant='outlined'
                      color='error'
                      sx={{ marginLeft: 'auto' }}
                    />
                  ) : null}
                </ListItem>
              ))}
            </List>
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
          )}
        </CardContent>
      </Card>
    </>
  );
}
