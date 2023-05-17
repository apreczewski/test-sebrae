import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://viacep.com.br/ws/',
});

export const db = axios.create({
  baseURL: 'http://localhost:3000',
});

