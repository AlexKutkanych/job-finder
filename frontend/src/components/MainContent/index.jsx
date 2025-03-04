import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Search from '../../pages/Search';
import NotFound from '../../pages/NotFound';
import JobPage from '../../pages/JobPage';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import ProfilePage from '../../pages/Profile';
import ProtectedRoute from '../../pages/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

export default function MainContent() {
  const { auth } = useAuth();

  const hasToken = auth?.hasToken;
  const isLoggedIn = hasToken && auth?.user?.username;

  return (
    <Container
      maxWidth='lg'
      component='main'
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 2 }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/job/:id' element={<JobPage />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute user={isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/sign-in'
          element={isLoggedIn ? <Navigate to='/' /> : <SignIn />}
        />
        <Route
          path='/sign-up'
          element={isLoggedIn ? <Navigate to='/' /> : <SignUp />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Container>
  );
}
