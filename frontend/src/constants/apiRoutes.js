const BASE_URL = `${process.env.REACT_APP_API_PATH}/api/v1`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;
const JOBS_BASE_URL = `${BASE_URL}/jobs`;
const USER_BASE_URL = `${BASE_URL}/user`;

const AUTH_API_ROUTES = {
  SIGN_UP: `${AUTH_BASE_URL}/signup`,
  LOGIN: `${AUTH_BASE_URL}/login`,
  LOGOUT: `${AUTH_BASE_URL}/logout`,
};

const JOBS_API_ROUTES = {
  SEARCH: `${JOBS_BASE_URL}/search`,
  SEARCH_BY_ID: `${JOBS_BASE_URL}/:id`,
};

const USER_API_ROUTES = {
  GET_USER_TOKEN: `${USER_BASE_URL}/token`,
  GET_USER_PROFILE: `${USER_BASE_URL}/profile`,
};

export { AUTH_API_ROUTES, JOBS_API_ROUTES, USER_API_ROUTES };
