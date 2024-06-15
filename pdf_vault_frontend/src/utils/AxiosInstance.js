import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
})

export default AxiosInstance;