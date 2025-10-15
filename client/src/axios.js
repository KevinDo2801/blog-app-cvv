import axios from "axios";

// Create axios instance with base URL from environment variable
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Important for sending cookies with requests
});

export default instance;

