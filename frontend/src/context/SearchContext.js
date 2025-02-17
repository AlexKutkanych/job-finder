import React, { createContext, useContext, useState } from 'react';
import allJobs from '../mock/jobs';

const initialSearchParams = {
  jobCountry: 'all',
  jobCity: 'all',
  jobSearch: '',
  visa: 'all',
  jobField: 'all',
};

const SearchContext = createContext(initialSearchParams);

const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [jobs, setJobs] = useState(allJobs);
  const [currentJob, setCurrentJob] = useState(null);
  const [cities, setCities] = useState([{ id: 'all', label: 'All cities' }]);

  const [isReset, setIsReset] = useState(false);

  const resetSearchParams = () => {
    setSearchParams(initialSearchParams);
    setIsReset(true);
  };

  return (
    <SearchContext.Provider
      value={{
        initialSearchParams,
        searchParams,
        setSearchParams,
        resetSearchParams,
        cities,
        setCities,
        jobs,
        setJobs,
        // searchJobs,
        isReset,
        setIsReset,
        currentJob,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearch };
