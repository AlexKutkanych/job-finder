import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  description,
  salary,
  visa = '',
  experienceLevel,
}) {
  return (
    <Card sx={{}}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Link
          href={`/job/${id}`}
          variant='body1'
          sx={{ textDecoration: 'none', fontWeight: 'bold' }}
        >
          {title}
        </Link>
        <Typography gutterBottom component='p'>
          {company}
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
        <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
          {[salary, type, visa?.label, experienceLevel].reduce((acc, item) => {
            if (!item) return acc;
            acc.push(<Chip label={item} color='primary' variant='outlined' />);
            return acc;
          }, [])}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, paddingTop: 0 }}>
        <Button href={`/job/${id}`} size='small'>
          Learn More
        </Button>
        <Button size='small' color='secondary'>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
