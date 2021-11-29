import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5 * 1000,
  params: {},
});

export default apiClient;
