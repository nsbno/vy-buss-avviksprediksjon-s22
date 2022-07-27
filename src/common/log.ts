import { getBaseUrl } from "api/config";
import appConfig from "appConfig.json";
import { post } from "api/apiClient";

const baseUrl = getBaseUrl();

export enum LogLevel {
  ERROR = "error",
  WARNING = "warn",
  INFO = "info",
}

type LogPayload = {
  logLevel: LogLevel;
  source: string;
  data: {
    username: string | null;
    componentStack: string;
  };
  message?: string;
};

const logPayload = (
  logLevel: LogLevel,
  message: string,
  componentStack?: string
): LogPayload => ({
  logLevel,
  source: appConfig.name,
  data: {
    username: "INSERT_USERNAME_HERE",
    componentStack: componentStack || "Not Available",
  },
  message,
});

export const sendLogToCloudWatch = (payload: LogPayload) =>
  post(`${baseUrl}/frontend-logger/log`, payload);

export const log = {
  info: (message: string, componentStack?: string) =>
    sendLogToCloudWatch(logPayload(LogLevel.INFO, message, componentStack)),
  warning: (message: string, componentStack?: string) =>
    sendLogToCloudWatch(logPayload(LogLevel.WARNING, message, componentStack)),
  error: (message: string, componentStack?: string) =>
    sendLogToCloudWatch(logPayload(LogLevel.ERROR, message, componentStack)),
};
