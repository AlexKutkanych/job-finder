import { createContext } from 'react';

const initialSearch = {
  jobCountry: 'all',
  jobCity: 'all',
  jobSearch: '',
  visa: 'unknown',
  jobField: 'all',
};

export const SearchContext = createContext(initialSearch);
export const AuthContext = createContext(null);