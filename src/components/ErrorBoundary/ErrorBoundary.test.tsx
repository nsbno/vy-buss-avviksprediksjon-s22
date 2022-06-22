import React from "react";
import axios from "axios";
import { render, waitFor } from "@testing-library/react";
import { LogLevel } from "common/log";
import appConfig from "appConfig.json";
import { ErrorBoundary } from "./ErrorBoundary";
import * as apiClient from "api/apiClient";

const LOGGER_URL = appConfig.backend.baseUrl.TEST + "/frontend-logger/log";

beforeEach(() => {
  jest.spyOn(console, "error");
  // @ts-ignore
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

const ERROR_MESSAGE = "En feil har oppstått";

describe("ErrorBoundary", () => {
  test("should render error message and call logger endpoint with correct data", async () => {
    const axiosPostMethod = jest.spyOn(apiClient, "post").mockImplementation();

    const ErrorThrowingComponent = () => {
      throw new Error(ERROR_MESSAGE);
    };
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );
    await waitFor(() => {
      expect(getByText(ERROR_MESSAGE)).toBeInTheDocument();

      expect(
        getByText(
          "Feilen er rapportert til utviklerne. Oppdater siden for å gå tilbake"
        )
      ).toBeInTheDocument();

      expect(
        getByText(
          "Dersom feilen er gjentakende, send gjerne en liten beskrivelse om hvordan du gikk frem da feilen oppstod"
        )
      ).toBeInTheDocument();

      expect(axiosPostMethod).toHaveBeenCalledWith(
        LOGGER_URL,
        expect.objectContaining({
          logLevel: LogLevel.ERROR,
          data: {
            componentStack: expect.anything(),
            username: expect.anything(),
          },
          message: ERROR_MESSAGE,
          source: appConfig.name,
        })
      );
    });
  });
});
