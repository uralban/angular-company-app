declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP: string;
  readonly NG_APP_PORT: string;
  readonly NG_APP_API_URL: string;
  readonly NG_APP_AUTH0_DOMAIN: string;
  readonly NG_APP_AUTH0_CLIENT_ID: string;
  readonly NG_APP_AUTH0_AUDIENCE: string;
  readonly NG_APP_DEFAULT_USER_AVATAR: string;
  readonly NG_APP_DEFAULT_COMPANY_LOGO: string;
  readonly NG_APP_PUBLIC: string;
  readonly NG_APP_PUBLIC_PORT: string;
  readonly NG_APP_PUBLIC_API_URL: string;
  readonly NG_APP_PUBLIC_AUTH0_DOMAIN: string;
  readonly NG_APP_PUBLIC_AUTH0_CLIENT_ID: string;
  readonly NG_APP_PUBLIC_AUTH0_AUDIENCE: string;
  readonly NG_APP_PUBLIC_DEFAULT_USER_AVATAR: string;
  readonly NG_APP_PUBLIC_DEFAULT_COMPANY_LOGO: string;
}

declare interface ImportMeta {
  readonly env: Env;
}
