const isDev = import.meta.env.DEV;

export const HOST = isDev ? import.meta.env.VITE_API_HOST : import.meta.env.VITE_API_HOST;

export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
