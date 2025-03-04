import { JOBS_API_ROUTES } from '../constants/apiRoutes';
import apiClient from './apiClient';

export const searchJobs = async (body) => {
  const response = await apiClient.post(JOBS_API_ROUTES.SEARCH, body);
  return response.data;
};

export const searchJobById = async (id) => {
  const response = await apiClient.get(
    JOBS_API_ROUTES.SEARCH_BY_ID.replace(':id', id)
  );
  return response.data;
};

export const bookmarkJob = async (body) => {
  const response = await apiClient.patch(JOBS_API_ROUTES.BOOKMARK_JOB, body);
  return response.data;
};

export const applyForJob = async (body) => {
  const response = await apiClient.patch(JOBS_API_ROUTES.APPLY_FOR_JOB, body);
  return response.data;
};
