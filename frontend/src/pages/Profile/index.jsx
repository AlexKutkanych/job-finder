import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { getUserProfile } from '../../api/user';
import UserCard from '../../components/UserCard';
import ProfileJobs from '../../components/ProfileJobs';
import { useAuth } from '../../context/AuthContext';
import { bookmarkJob } from '../../api/jobs';
import NoJob from '../../components/NoJob';
import Snackbar from '../../components/Snackbar';
import { getSaveJobMessage } from '../../utils/snackbarMessages';

export default function ProfilePage() {
  const { auth, saveUser } = useAuth();

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  let params = useParams();

  const getProfileQuery = useQuery({
    queryKey: ['getProfile'],
    queryFn: getUserProfile,
  });

  const { data, isPending, isSuccess, isError } = getProfileQuery;

  const bookmarkJobQuery = useMutation({
    mutationFn: bookmarkJob,
  });

  useEffect(() => {
    if (bookmarkJobQuery?.isSuccess) {
      const user = bookmarkJobQuery?.data?.user;
      const message = getSaveJobMessage(
        bookmarkJobQuery?.data?.user?.savedJobs,
        params?.id
      );
      setSnackbarMessage(message);
      saveUser(user);
      setOpen(true);
      setSavedJobs(user?.savedJobs ?? []);
      setAppliedJobs(user?.jobsApplied ?? []);
    }
  }, [bookmarkJobQuery?.isSuccess]);

  useEffect(() => {
    setSavedJobs(data?.user?.savedJobs ?? []);
  }, [data?.user?.savedJobs]);

  useEffect(() => {
    setAppliedJobs(data?.user?.jobsApplied ?? []);
  }, [data?.user?.jobsApplied]);

  const user = data?.user;

  const handleRemoveBookmark = (jobId) => {
    bookmarkJobQuery.mutate({ userId: auth?.user?._id, jobId });
  };

  return (
    <Stack spacing={2}>
      {isPending ? <Loader /> : null}
      {isError ? <NoJob /> : null}
      {isSuccess ? (
        <>
          <UserCard user={user} />
          <ProfileJobs title='Applied Jobs' jobs={appliedJobs} />
          <ProfileJobs
            title='Saved Jobs'
            jobs={savedJobs}
            removeFromBookmarks={handleRemoveBookmark}
          />
        </>
      ) : null}
      <Snackbar open={open} setOpen={setOpen} message={snackbarMessage} />
    </Stack>
  );
}
