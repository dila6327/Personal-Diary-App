

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ backend URL!
  withCredentials: false, // or true if needed for cookies
});

export default API;
