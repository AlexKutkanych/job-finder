import React from 'react';
import { Link, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import JobLabels from '../../components/JobLabels';
import ActionButton from '../../components/ActionButton';
import List from '@mui/material/List';
import CoreListItem from '@mui/material/ListItem';
import { Box, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchJobById } from '../../utils/jobs';
import Loader from '../../components/Loader';
import { formatDate } from '../../utils/date';

const ListItem = styled(CoreListItem)({
  fontSize: '.875rem',
  paddingTop: 0,
});

export default function JobPage() {
  let params = useParams();

  const searchJobByIdQuery = useQuery({
    queryKey: ['selectedJob'],
    queryFn: () => searchJobById(params?.id),
  });

  const {
    data: currentJob,
    isPending,
    isSuccess,
    isError,
  } = searchJobByIdQuery;

  const {
    title,
    location,
    postedDate,
    salary,
    type,
    visa,
    experienceLevel,
    description,
    requirements,
    responsibilities,
    company,
  } = currentJob || {};

  return (
    <Stack spacing={2}>
      {isPending ? <Loader /> : null}
      {isError ? (
        <Typography>
          Job not found! Go back to <Link to='/search'>Search page</Link>
        </Typography>
      ) : null}
      {isSuccess ? (
        <>
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {title}
              </Typography>
              <Typography component='p'>{location?.full}</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {company?.name}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Posted: {formatDate(postedDate)}
              </Typography>
              <JobLabels
                labels={[salary, type, visa?.label, experienceLevel]}
              />
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <ActionButton label='Apply' size='small' variant='contained' />
              <ActionButton label='Save' size='small' variant='outlined' />
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <Typography variant='h5'>About this job</Typography>
              <Typography variant='body2' sx={{ pt: 1 }}>
                {description}
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'bold', pt: 2 }}>
                Requirements:
              </Typography>
              <List>
                {requirements?.map((requirement, index) => (
                  <ListItem key={index}>{requirement}</ListItem>
                ))}
              </List>
              <Typography variant='body1' sx={{ fontWeight: 'bold', pt: 2 }}>
                Responsibilities:
              </Typography>
              <List>
                {responsibilities?.map((responsibility, index) => (
                  <ListItem key={index}>{responsibility}</ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ pb: 1 }}
              >
                About the company
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CardMedia
                  sx={{ height: 140, width: 140 }}
                  image={`${process.env.PUBLIC_URL}/assets/google.svg`}
                  // TODO: replace logo from DB
                  // image={company?.logo}
                  title='company logo'
                />
                <Stack spacing={1}>
                  <Typography component='p'>{company?.name}</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {company?.employees} employees
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : null}
    </Stack>
  );
}
