import axios from "axios";
import queryClient from "./queryClient";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

console.log("Hello");

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    console.log("I am who");
    // try to refresh the access token behind the scenes
    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        console.log(`refresh token initialized`);
        // refresh the access token, then retry the original request
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        // handle refresh errors by clearing the query cache & redirecting to login
        console.log(error);
        queryClient.clear();
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
