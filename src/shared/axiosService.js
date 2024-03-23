import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = "http://localhost:3000/api/";

    // Set Content-Type header to application/json
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
