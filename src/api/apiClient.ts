import axios, { AxiosRequestConfig } from "axios";
import { requestConfigWithAuth } from "./config";

export const get = async <ResponseDataType>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<ResponseDataType> => {
  const response = await axios.get<ResponseDataType>(url, config);
  return response.data;
};

export const post = async <RequestDataType, ResponseDataType>(
  url: string,
  data: RequestDataType,
  config: AxiosRequestConfig = {}
): Promise<ResponseDataType> => {
  const response = await axios.post<ResponseDataType>(url, data, config);
  return response.data;
};

export const put = async <RequestDataType, ResponseDataType>(
  url: string,
  data: RequestDataType,
  config: AxiosRequestConfig
): Promise<ResponseDataType> => {
  const response = await axios.put<ResponseDataType>(url, data, config);
  return response.data;
};

export const remove = async <ResponseDataType>(
  url: string,
  config: AxiosRequestConfig
): Promise<ResponseDataType> => {
  const response = await axios.delete<ResponseDataType>(url, config);
  return response.data;
};

export const getWithAuthentication = async <ResponseDataType>(
  url: string
): Promise<ResponseDataType> =>
  await get<ResponseDataType>(url, requestConfigWithAuth());

export const postWithAuthentication = async <RequestDataType, ResponseDataType>(
  url: string,
  data: RequestDataType
): Promise<ResponseDataType> =>
  await post<RequestDataType, ResponseDataType>(
    url,
    data,
    requestConfigWithAuth()
  );

export const putWithAuthentication = async <RequestDataType, ResponseDataType>(
  url: string,
  data: RequestDataType
): Promise<ResponseDataType> =>
  await put<RequestDataType, ResponseDataType>(
    url,
    data,
    requestConfigWithAuth()
  );

export const removeWithAuthentication = async <ResponseDataType>(
  url: string
): Promise<ResponseDataType> =>
  await remove<ResponseDataType>(url, requestConfigWithAuth());
