import { hasAccessToken } from "auth/loginFlowTypes";
import { getState } from "auth/storage";
import axios, { AxiosRequestConfig } from "axios";
import { getCurrentEnvironment, Environment } from "environment";
import appConfig from "appConfig.json";

const getAccessToken = () => {
  const state = getState();

  if (hasAccessToken(state)) {
    return state.accessToken;
  }

  throw new Error("Api attempting use accesstoken when it is not available");
};

const buildAuthHeader = (): string => `Bearer ${getAccessToken()}`;

(axios.defaults.headers as any).common["Content-Type"] =
  "application/json;charset=utf-8";

export const requestConfigWithAuth = (): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: buildAuthHeader(),
    },
  };
};

export const getBaseUrl = () => {
  const env = getCurrentEnvironment();

  switch (env) {
    case Environment.DEVELOPMENT:
      return appConfig.backend.baseUrl.DEV;

    case Environment.TEST:
      return appConfig.backend.baseUrl.TEST;

    case Environment.STAGE:
      return appConfig.backend.baseUrl.STAGE;

    case Environment.PRODUCTION:
      return appConfig.backend.baseUrl.PROD;

    default:
      return appConfig.backend.baseUrl.TEST;
  }
};

export const getApiUrl = () => {
  const env = getCurrentEnvironment();
  const contextPath = appConfig.backend.contextPath;

  switch (env) {
    case Environment.DEVELOPMENT:
      return `${getBaseUrl()}${contextPath}`;

    case Environment.TEST:
      return `${getBaseUrl()}${contextPath}`;

    case Environment.STAGE:
      return `${getBaseUrl()}${contextPath}`;

    case Environment.PRODUCTION:
      return `${getBaseUrl()}${contextPath}`;

    default:
      return `${getBaseUrl()}${contextPath}`;
  }
};
