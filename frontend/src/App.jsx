import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainContent from './containers/MainContent';

export default function App() {
  const queryClient = new QueryClient();
  const { auth } = useAuth();

  console.log(auth, 'auth');
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
