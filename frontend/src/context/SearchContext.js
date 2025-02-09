import React, { createContext, useContext, useState } from 'react';
import allJobs from '../mock/jobs';

const initialSearchParams = {
  jobCountry: 'all',
  jobCity: 'all',
  jobSearch: '',
  visa: 'unknown',
  jobField: 'all',
};

const SearchContext = createContext(initialSearchParams);

const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [jobs, setJobs] = useState(allJobs);

  const [isLoading, setIsLoading] = useState(false);

  // TODO: add jobs fetching from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('YOUR_API_ENDPOINT');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const result = await response.json();
  //       setData(result);
  //     } catch (e) {
  //       setError(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const searchJobs = (newSearch) => {
    setSearchParams((state) => ({ ...state, ...newSearch }));
    const filterJobs = allJobs.filter(
      ({ title, location: { city, code }, visa, types }) => {
        const isCountryMatch =
          newSearch.jobCountry === 'all' || newSearch.jobCountry === code;
        const isCityMatch =
          newSearch.jobCity === 'all' || newSearch.jobCity === city;
        const isVisaMatch =
          newSearch.visa === 'unknown' || newSearch.visa === visa?.id;
        const isJobFieldMatch =
          newSearch.jobField === 'all' || types.includes(newSearch.jobField);
        const isJobSearchMatch = title
          .toLowerCase()
          .includes(newSearch.jobSearch.toLowerCase());
        console.log('sdfsdf');
        return (
          isCountryMatch &&
          isCityMatch &&
          isVisaMatch &&
          isJobFieldMatch &&
          isJobSearchMatch
        );
      }
    );
    setJobs(filterJobs);
  };

  return (
    <SearchContext.Provider
      value={{
        initialSearchParams,
        searchParams,
        setSearchParams,
        jobs,
        searchJobs,
        isLoading,
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
