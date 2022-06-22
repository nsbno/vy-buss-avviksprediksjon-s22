import * as apiClient from "api/apiClient";

jest.mock("api/apiClient");

export const mockApiGet = <T>(response: T): jest.Mock<any, any> =>
  (apiClient.get as jest.Mock).mockImplementationOnce(
    () => new Promise((resolve) => resolve(response))
  );

export const mockApiPost = <T>(response: T): jest.Mock<any, any> =>
  (apiClient.post as jest.Mock).mockImplementationOnce(
    () => new Promise((resolve) => resolve(response))
  );
