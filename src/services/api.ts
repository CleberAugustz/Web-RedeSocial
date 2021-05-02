import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68.183.138.83/redesocial',
});

export default api;
