import { get } from "api/apiClient";
import { getApiUrl } from "api/config";
import { LoginSettings } from "./loginFlowTypes";

const baseUrl = getApiUrl();

export const getLoginData = async (): Promise<LoginSettings> => {
  return get<LoginSettings>(`${baseUrl}/app-data`);
};
