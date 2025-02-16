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

  // const searchJobs = (newSearch) => {
  //   console.log('@@@@@@@@@@  searchJobs');
  //   setSearchParams((state) => ({ ...state, ...newSearch }));
  //   const filterJobs = allJobs.filter(
  //     ({ title, location: { city, code }, visa, types }) => {
  //       const isCountryMatch =
  //         newSearch.jobCountry === 'all' || newSearch.jobCountry === code;
  //       const isCityMatch =
  //         newSearch.jobCity === 'all' || newSearch.jobCity === city;
  //       const isVisaMatch =
  //         newSearch.visa === 'unknown' || newSearch.visa === visa?.id;
  //       const isJobFieldMatch =
  //         newSearch.jobField === 'all' || types.includes(newSearch.jobField);
  //       const isJobSearchMatch = title
  //         .toLowerCase()
  //         .includes(newSearch.jobSearch.toLowerCase());

  //       return (
  //         isCountryMatch &&
  //         isCityMatch &&
  //         isVisaMatch &&
  //         isJobFieldMatch &&
  //         isJobSearchMatch
  //       );
  //     }
  //   );
  //   setJobs(filterJobs);
  // };

  const fetchJobById = (id) => {
    const job = jobs.find((job) => job.id === +id);
    setCurrentJob(job);
  };

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
        fetchJobById,
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
