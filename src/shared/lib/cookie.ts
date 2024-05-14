import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (name: string, value: string, options?: CookieOptions) => {
  const defaultOptions =
    process.env.NODE_ENV === 'development'
      ? { httpOnly: false, secure: false }
      : { httpOnly: true, secure: true };

  // return cookies.set(name, value, { httpOnly: true, secure: true, ...options });
  // return cookies.set(name, value, { ...options });
  return cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const clearCookie = (name) => {
  return cookies.remove(name);
};
