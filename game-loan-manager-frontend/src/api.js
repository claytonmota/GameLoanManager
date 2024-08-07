import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7107/api', // Substitua pelo URL da sua API
});

export default api;
