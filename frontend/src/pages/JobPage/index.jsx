import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { applyForJob, bookmarkJob, searchJobById } from '../../api/jobs';
import Loader from '../../components/Loader';
import { formatDate } from '../../utils/date';
import { useAuth } from '../../context/AuthContext';
import Snackbar from '../../components/Snackbar';
import NoJob from '../../components/NoJob';
import { getSaveJobMessage } from '../../utils/snackbarMessages';

const ListItem = styled(CoreListItem)({
  fontSize: '.875rem',
  paddingTop: 0,
});

export default function JobPage() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  let params = useParams();
  const { auth, saveUser } = useAuth();

  const searchJobByIdQuery = useQuery({
    queryKey: ['selectedJob'],
    queryFn: () => searchJobById(params?.id),
  });

  const bookmarkJobQuery = useMutation({
    mutationFn: bookmarkJob,
  });

  const applyForJobQuery = useMutation({
    mutationFn: applyForJob,
  });

  useEffect(() => {
    if (bookmarkJobQuery?.isSuccess) {
      debugger;
      const message = getSaveJobMessage(
        bookmarkJobQuery?.data?.user?.savedJobs,
        params?.id
      );
      setSnackbarMessage(message);
      setOpen(true);
      saveUser(bookmarkJobQuery?.data?.user);
    }
  }, [bookmarkJobQuery?.isSuccess]);

  useEffect(() => {
    if (applyForJobQuery?.isSuccess) {
      setSnackbarMessage('Successfully applied for job!');
      setOpen(true);
      saveUser(applyForJobQuery?.data?.user);
    }
  }, [applyForJobQuery?.isSuccess]);

  const hasJobId = useCallback(
    (type) => {
      const user = auth?.user || bookmarkJobQuery?.data?.user;
      debugger;

      if (!Object.keys(user)?.length) return false;
      const jobIds = user[type].reduce((acc, cur) => {
        acc.push(cur?._id);
        return acc;
      }, []);
      return jobIds.includes(params?.id);
    },
    [auth?.user, params?.id]
  );

  const handleApplyForJob = () => {
    applyForJobQuery.mutate({ userId: auth?.user?._id, jobId: params?.id });
  };

  const handleBookmark = () => {
    bookmarkJobQuery.mutate({ userId: auth?.user?._id, jobId: params?.id });
  };

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
    applicants,
  } = currentJob || {};

  return (
    <Stack spacing={2}>
      {isPending ? <Loader /> : null}
      {isError ? <NoJob /> : null}
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
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Applications: {applicants?.length || 0}
              </Typography>
              <JobLabels
                labels={[salary, type, visa?.label, experienceLevel]}
              />
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <ActionButton
                onClick={handleApplyForJob}
                label={hasJobId('jobsApplied') ? 'Applied' : 'Apply'}
                size='small'
                variant='contained'
                disabled={hasJobId('jobsApplied')}
              />
              <ActionButton
                onClick={handleBookmark}
                label={hasJobId('savedJobs') ? 'Saved' : 'Save'}
                size='small'
                variant='outlined'
              />
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
          <Snackbar open={open} setOpen={setOpen} message={snackbarMessage} />
        </>
      ) : null}
    </Stack>
  );
}
