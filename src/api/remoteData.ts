import { getWithAuthentication } from "api/apiClient";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { log } from "common/log";

interface NotAsked {
  status: "NotAsked";
}

interface ShouldRefresh<ResponseValueType> {
  status: "ShouldRefresh";
  prevData: ResponseValueType;
}

interface Loading {
  status: "Loading";
}

interface Refreshing<ResponseValueType> {
  status: "Refreshing";
  prevData: ResponseValueType;
}

interface Success<ResponseValueType> {
  status: "Success";
  data: ResponseValueType;
}

interface Failure<ErrorType> {
  status: "Failure";
  error: ErrorType;
}

// <ResponseValueType> Er responstypen til requesten, og vi bruker den i useRemoteData.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RemoteDataGetRequest<ResponseValueType> {
  url: string;
}

export const notAsked: NotAsked = { status: "NotAsked" };
export const loading: Loading = { status: "Loading" };
export const success = <ResponseValueType>(
  data: ResponseValueType
): Success<ResponseValueType> => ({
  status: "Success",
  data,
});
export const failure = <ErrorType>(error: ErrorType): Failure<ErrorType> => ({
  status: "Failure",
  error,
});
export const shouldRefresh = <ResponseValueType>(
  prevData: ResponseValueType
): ShouldRefresh<ResponseValueType> => ({
  status: "ShouldRefresh",
  prevData,
});
export const refreshing = <ResponseValueType>(
  prevData: ResponseValueType
): Refreshing<ResponseValueType> => ({
  status: "Refreshing",
  prevData,
});

type Error = AxiosError;

interface UseRemoteDataGetApi<T> {
  remoteData: RemoteData<T, Error>;
  refresh: () => void;
}

export type RemoteData<ResponseValueType, ErrorType> =
  | NotAsked
  | Loading
  | Success<ResponseValueType>
  | Failure<ErrorType>
  | ShouldRefresh<ResponseValueType>
  | Refreshing<ResponseValueType>;

export const useRemoteData = <ResponseValueType>(
  request: RemoteDataGetRequest<ResponseValueType>
): UseRemoteDataGetApi<ResponseValueType> => {
  const [remoteData, setRemoteData] =
    useState<RemoteData<ResponseValueType, Error>>(notAsked);

  const refresh = () => {
    setRemoteData((prevRemoteData) => {
      if (prevRemoteData.status === "Success") {
        return shouldRefresh(prevRemoteData.data);
      } else if (prevRemoteData.status === "Failure") {
        return notAsked;
      }
      return prevRemoteData;
    });
  };

  useEffect(() => {
    const getData = () =>
      getWithAuthentication<ResponseValueType>(request.url)
        .then((response) => {
          setRemoteData(success(response));
        })
        .catch((error) => {
          log.warning(JSON.stringify(error));
          setRemoteData(failure(error));
        });

    if (remoteData.status === "NotAsked") {
      setRemoteData(loading);
      getData();
    } else if (remoteData.status === "ShouldRefresh") {
      setRemoteData(refreshing(remoteData.prevData));
      getData();
    }
  }, [remoteData.status]);

  return {
    remoteData,
    refresh,
  };
};
