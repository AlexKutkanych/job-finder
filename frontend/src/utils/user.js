import { USER_API_ROUTES } from '../constants/apiRoutes';
import apiClient from './apiClient';

export const getUserProfile = async () => {
  const response = await apiClient.get(USER_API_ROUTES.GET_USER_PROFILE);
  return response.data;
};
