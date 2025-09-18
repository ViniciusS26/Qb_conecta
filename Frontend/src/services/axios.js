import axios from 'axios';
import { API_URL } from '@/config';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Função para tratamento de erros
const handleErrors = error => {
  if (error.response) {
    // Erro de resposta da API (por exemplo, código de status não-OK)
    console.error('Erro de resposta da API:', error.response.data);
  } else if (error.request) {
    // Erro na requisição (sem resposta da API)
    console.error('Erro na requisição:', error.request);
  } else {
    // Erro ao configurar a requisição
    console.error('Erro ao configurar a requisição:', error.message);
  }
  return Promise.reject(error);
};

// Função para tratamento de respostas de sucesso
const handleSuccess = response => response.data;

// Funções de chamadas HTTP
export const get = (url, config = {}) => {
  return axiosInstance.get(url, config)
    .then(handleSuccess)
    .catch(handleErrors);
};

export const post = (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config)
    .then(handleSuccess)
    .catch(handleErrors);
};

export const put = (url, data = {}, config = {}) => {
  return axiosInstance.put(url, data, config)
    .then(handleSuccess)
    .catch(handleErrors);
};

export const patch = (url, data = {}, config = {}) => {
  return axiosInstance.patch(url, data, config)
    .then(handleSuccess)
    .catch(handleErrors);
};

export const remove = (url, config = {}) => {
  return axiosInstance.delete(url, config)
    .then(handleSuccess)
    .catch(handleErrors);
};
