import axios from "axios";

const foxUrl =
  "https://fox-training-f2fph3abhfgbb4hv.eastus-01.azurewebsites.net";

const config = axios.create({
  baseURL: foxUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization header if the token is present
config.interceptors.request.use(
  (request) => {
    // Get token from session storage
    const token = sessionStorage.getItem("token");

    // If token exists, add it to the headers
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request; // Continue with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default config;
