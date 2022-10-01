import axios from 'axios';

const url = 'http://192.168.234.128:8000';

export const ApiService = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});
