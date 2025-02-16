import { JOBS_API_ROUTES } from '../constants/apiRoutes';
import apiClient from './apiClient';

export const searchJobs = async (body) => {
  const response = await apiClient.post(JOBS_API_ROUTES.SEARCH, body);
  return response.data;
};
