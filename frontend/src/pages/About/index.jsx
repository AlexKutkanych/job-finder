import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, styled } from '@mui/material';

const BulletPointTitle = styled('span')({
  fontWeight: 'bold',
});

export default function About(props) {
  return (
    <>
      <Typography variant='h3'>Welcome to JobFinder</Typography>
      <Typography>
        Welcome to JobFinder, your one-stop solution for finding the perfect
        job! Whether you are a fresh graduate looking for your first job, an
        experienced professional seeking new opportunities, or someone looking
        to switch careers, JobFinder is here to help you on your journey.
      </Typography>
      <Box>
        <Typography variant='h4'>Why Choose JobFinder?</Typography>
        <List>
          <ListItem>
            <BulletPointTitle>Extensive Job Listings:</BulletPointTitle>
            &nbsp;Access thousands of job postings from top companies across
            various industries.
          </ListItem>
          <ListItem>
            <BulletPointTitle>
              Personalized Job Recommendations:
            </BulletPointTitle>
            &nbsp;Receive job suggestions tailored to your skills, experience,
            and preferences.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Easy Application Process:</BulletPointTitle>
            &nbsp;Apply for jobs with just a few clicks using our user-friendly
            interface.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Career Resources:</BulletPointTitle>
            &nbsp;Benefit from our resume building tools, interview tips, and
            career advice to help you succeed.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Employer Insights:</BulletPointTitle>
            &nbsp;Learn more about potential employers through company profiles
            and employee reviews.
          </ListItem>
        </List>
      </Box>
      <Box>
        <Typography variant='h4'>How It Works</Typography>
        <List>
          <ListItem>
            <BulletPointTitle>Create Your Profile:</BulletPointTitle>
            &nbsp;Sign up and create a detailed profile to showcase your skills,
            experience, and career goals.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Search for Jobs:</BulletPointTitle>
            &nbsp;Use our advanced search filters to find jobs that match your
            criteria.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Apply Online:</BulletPointTitle>
            &nbsp;Submit your application directly through our platform.
          </ListItem>
          <ListItem>
            <BulletPointTitle>Get Noticed:</BulletPointTitle>
            &nbsp;Let employers find you by making your profile visible to
            recruiters.
          </ListItem>
          <ListItem>
            <BulletPointTitle></BulletPointTitle>
            &nbsp;
          </ListItem>
        </List>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h4'>Join JobFinder Today</Typography>
        <Typography>
          Take the first step towards your dream job by joining JobFinder today.
          Start exploring job opportunities, connecting with employers, and
          advancing your career.
        </Typography>
        <Typography>Happy Job Hunting!</Typography>
        <Typography>The JobFinder Team.</Typography>
      </Box>
    </>
  );
}
