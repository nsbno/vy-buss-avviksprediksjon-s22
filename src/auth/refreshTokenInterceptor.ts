import axios from "axios";
import * as loginFlow from "./loginFlow";

export const registerInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      if (error?.response?.status === 401 && !originalRequest._retry) {
        loginFlow.setExpiredAccessToken();

        originalRequest._retry = true;

        return loginFlow
          .refreshToken()
          .then((result) => {
            if (result.status === "LoggedIn") {
              originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
              return axios(originalRequest);
            }

            throw new Error(
              `Feil status etter refresh av token: ${result.status}`
            );
          })
          .catch((error) => {
            return Promise.reject(
              new Error(`Feil ved refresh av tokens: ${error}`)
            );
          });
      }

      return Promise.reject(error.message);
    }
  );
};
