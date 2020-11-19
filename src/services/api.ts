import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiredesocial.herokuapp.com',
});

export default api;
