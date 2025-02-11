export const environment = {
  production: import.meta.env.NODE_ENV === 'production',
  apiUrl: import.meta.env.NG_APP_API_URL,
  auth0Domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
  audience: import.meta.env.NG_APP_AUTH0_AUDIENCE,
};

