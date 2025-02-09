import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Search from './pages/Search';

export default function Blog(props) {
  return (
    <Router>
      <Navigation />
      <Container
        maxWidth='lg'
        component='main'
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}
