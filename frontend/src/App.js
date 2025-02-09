import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { SearchProvider } from './context/SearchContext';

export default function JobSearch() {
  return (
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
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </SearchProvider>
  );
}
