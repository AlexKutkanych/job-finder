import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import JobLabels from '../JobLabels';

export default function JobCard({
  _id,
  title,
  location,
  type,
  description,
  salary,
  visa = '',
  experienceLevel,
}) {
  return (
    <Card>
      <CardContent sx={{ textAlign: 'left' }}>
        <Link
          href={`/job/${_id}`}
          variant='body1'
          sx={{ textDecoration: 'none', fontWeight: 'bold' }}
        >
          {title}
        </Link>
        <Typography gutterBottom component='p'>
          {location?.city}, {location?.country}
        </Typography>
        <Typography
          variant='body2'
          component='p'
          sx={{ color: 'text.secondary' }}
        >
          {location?.full}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <JobLabels labels={[salary, type, visa?.label, experienceLevel]} />
      </CardContent>
      <CardActions sx={{ px: 2, paddingTop: 0 }}>
        <Button href={`/job/${_id}`} label='Learn More' size='small' />
        <Button size='small' label='Save' color='secondary' />
      </CardActions>
    </Card>
  );
}
