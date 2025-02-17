import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { SearchProvider } from './context/SearchContext';
import JobPage from './pages/JobPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProfilePage from './pages/Profile';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Router>
          <Navigation />
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
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </SearchProvider>
    </QueryClientProvider>
  );
}
