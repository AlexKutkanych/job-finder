import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';

export default function UserCard({
  user: {
    username,
    avatar,
    jobPosition,
    email,
    location,
    university,
    languages,
  },
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        margin: 'auto',
        marginTop: 20,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={username}
            src={avatar}
            sx={{
              width: 60,
              height: 60,
            }}
          />
        }
        title={<Typography variant='h6'>{username}</Typography>}
        subheader={<Typography variant='body2'>{jobPosition}</Typography>}
      />
      <Typography
        variant='caption'
        sx={{ position: 'absolute', top: 12, right: 12, color: green['500'] }}
      >
        Online
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          Email: {email}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Location: {location}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          University: {university}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Languages: {languages?.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}
