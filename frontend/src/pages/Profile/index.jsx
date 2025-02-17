import React from 'react';
import { Link, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader';
import { getUserProfile } from '../../utils/user';
import UserCard from '../../components/UserCard';

export default function ProfilePage() {
  const getProfileQuery = useQuery({
    queryKey: ['getProfile'],
    queryFn: getUserProfile,
  });

  const { data, isPending, isSuccess, isError } = getProfileQuery;

  const user = data?.user;
  console.log(user);

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
          <UserCard user={user} />
        </>
      ) : null}
    </Stack>
  );
}
