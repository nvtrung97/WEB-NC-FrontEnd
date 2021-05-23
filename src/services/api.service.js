import axios from "axios";
const api = axios.create({
  baseURL: global.config.API,
});

export default api;