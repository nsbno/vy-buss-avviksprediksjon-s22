import {
  postWithAuthentication,
  putWithAuthentication,
  removeWithAuthentication,
} from "./apiClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { log } from "common/log";

interface Loading<BodyType, ParametersType> {
  key: string;
  parameters: ParametersType;
  status: "Loading";
  body: BodyType;
  startTime: Date;
}

interface Refresh<BodyType, ParamtersType, ResponseValueType> {
  key: string;
  parameters: ParamtersType;
  status: "Loading";
  body: BodyType;
  startTime: Date;
  prevData: ResponseValueType;
}

interface Success<BodyType, ParametersType, ResponseValueType> {
  key: string;
  parameters: ParametersType;
  status: "Success";
  body: BodyType;
  data: ResponseValueType;
  startTime: Date;
  endTime: Date;
}

interface Failure<BodyType, ParametersType, ErrorType> {
  key: string;
  parameters: ParametersType;
  status: "Failure";
  body: BodyType;
  error: ErrorType;
  startTime: Date;
  endTime: Date;
}

export type RemoteAction<
  BodyType,
  ParametersType,
  ResponseValueType,
  ErrorType
> =
  | Loading<BodyType, ParametersType>
  | Success<BodyType, ParametersType, ResponseValueType>
  | Failure<BodyType, ParametersType, ErrorType>
  | Refresh<BodyType, ParametersType, ResponseValueType>;

export type RemoteActionMethod = "POST" | "PUT" | "DELETE";

// <BodyType> Er bodytypen til requesten, og vi bruker den i useRemoteData.
// <ResponseValueType> Er responstypen til requesten, og vi bruker den i useRemoteData.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RemoteActionRequest<BodyType, ParametersType, ResponseValueType> = {
  body: BodyType;
  method: RemoteActionMethod;
  url: (parameters: ParametersType) => string;
};

export const loading = <BodyType, ParametersType>(
  key: string,
  parameters: ParametersType,
  body: BodyType
): Loading<BodyType, ParametersType> => ({
  key,
  parameters,
  status: "Loading",
  body,
  startTime: new Date(),
});

export const refresh = <BodyType, ParametersType, ResponseValueType>(
  key: string,
  parameters: ParametersType,
  body: BodyType,
  prevData: ResponseValueType
): Refresh<BodyType, ParametersType, ResponseValueType> => ({
  key,
  parameters,
  status: "Loading",
  body,
  prevData,
  startTime: new Date(),
});

export const success = <BodyType, ParametersType, ResponseValueType>(
  key: string,
  parameters: ParametersType,
  body: BodyType,
  data: ResponseValueType,
  startTime: Date
): Success<BodyType, ParametersType, ResponseValueType> => ({
  key,
  parameters,
  status: "Success",
  body,
  data,
  startTime,
  endTime: new Date(),
});

export const failure = <BodyType, ParametersType, ErrorType>(
  key: string,
  parameters: ParametersType,
  body: BodyType,
  error: ErrorType,
  startTime: Date
): Failure<BodyType, ParametersType, ErrorType> => ({
  key,
  parameters,
  status: "Failure",
  body,
  error,
  startTime,
  endTime: new Date(),
});

const replaceRequestWith =
  <BodyType, ParametersType, ResponseValueType, ErrorType>(
    newState: RemoteAction<
      BodyType,
      ParametersType,
      ResponseValueType,
      ErrorType
    >
  ) =>
  (
    list: Array<
      RemoteAction<BodyType, ParametersType, ResponseValueType, ErrorType>
    >
  ) =>
    list.filter((r) => r.key !== newState.key).concat([newState]);

export const useRemoteAction = <BodyType, ParametersType, ResponseValueType>(
  request: RemoteActionRequest<BodyType, ParametersType, ResponseValueType>
) => {
  const [remoteActionList, setRemoteData] = useState<
    RemoteAction<BodyType, ParametersType, ResponseValueType, AxiosError>[]
  >([]);

  const clearFinished = () =>
    setRemoteData((prevState) =>
      prevState.filter((r) => r.status !== "Success" && r.status !== "Failure")
    );

  const get = (key: string) => remoteActionList.find((r) => r.key === key);

  const send = (key: string, parameters: ParametersType, body: BodyType) => {
    const prevRequest = remoteActionList.find((r) => r.key === key);

    if (prevRequest?.status === "Success" || prevRequest === undefined) {
      const nextState =
        prevRequest === undefined
          ? loading(key, parameters, body)
          : refresh(key, parameters, body, prevRequest.data);

      setRemoteData(
        replaceRequestWith<
          BodyType,
          ParametersType,
          ResponseValueType,
          AxiosError
        >(nextState)
      );

      const getMethod = (
        request: RemoteActionRequest<
          BodyType,
          ParametersType,
          ResponseValueType
        >
      ) => {
        switch (request.method) {
          case "POST":
            return postWithAuthentication<BodyType, ResponseValueType>(
              request.url(parameters),
              request.body
            );
          case "PUT":
            return putWithAuthentication<BodyType, ResponseValueType>(
              request.url(parameters),
              request.body
            );
          case "DELETE":
            return removeWithAuthentication<ResponseValueType>(
              request.url(parameters)
            );
        }
      };

      getMethod(request)
        .then((response: ResponseValueType) =>
          setRemoteData(
            replaceRequestWith(
              success(key, parameters, body, response, nextState.startTime)
            )
          )
        )
        .catch((error) => {
          log.warning(JSON.stringify(error));
          setRemoteData(
            replaceRequestWith(
              failure(key, parameters, body, error, nextState.startTime)
            )
          );
        });
    }
  };

  return { remoteActionList, get, send, clearFinished };
};
