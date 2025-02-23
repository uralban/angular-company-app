export const environment = {
  production: true,
  apiUrl: import.meta.env.NG_APP_PUBLIC_API_URL,
  auth0Domain: import.meta.env.NG_APP_PUBLIC_AUTH0_DOMAIN,
  clientId: import.meta.env.NG_APP_PUBLIC_AUTH0_CLIENT_ID,
  audience: import.meta.env.NG_APP_PUBLIC_AUTH0_AUDIENCE,
  defaultUserAvatar: import.meta.env.NG_APP_PUBLIC_DEFAULT_USER_AVATAR,
  defaultCompanyLogo: import.meta.env.NG_APP_PUBLIC_DEFAULT_COMPANY_LOGO,
};
