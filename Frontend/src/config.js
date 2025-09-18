import pkg from '../package.json'

export const DEFAULT_URL = import.meta.env.VITE_DEFAULT_LINK_PREFIX
export const API_URL = import.meta.env.VITE_API_URL
export const APP_VERSION = pkg.version