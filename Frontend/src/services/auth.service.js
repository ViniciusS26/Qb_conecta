import { post } from './axios';

export async function goToGoogleLogin() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh-token');
  window.location =  `${import.meta.env.VITE_API_URL}/v1/auth/google`;
}

export async function goToFacebookLogin() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh-token');
  window.location =  `${import.meta.env.VITE_API_URL}/v1/auth/facebook`;
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh-token');

  if (!refreshToken) {
    return;
  }

  const data = await post('v1/auth/refresh-tokens', { refreshToken });

  localStorage.setItem('token', data.access.token);
  localStorage.setItem('refresh-token', data.refresh.token);
}

export async function sendLoginMail(email) {
  return post('v1/auth/login-mail', { email });
}