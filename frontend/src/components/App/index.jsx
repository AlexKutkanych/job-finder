import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { SearchProvider } from '../../context/SearchContext';
import { AuthProvider } from '../../context/AuthContext';
import MainContent from '../MainContent';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <Navigation />
            <MainContent />
            <Footer />
          </Router>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
