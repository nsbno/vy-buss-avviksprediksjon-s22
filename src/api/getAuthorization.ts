import { getApiUrl } from "./config";
import { RemoteDataGetRequest } from "./remoteData";

const baseUrl = getApiUrl();

export const getAuthorization = (): RemoteDataGetRequest<String> => ({
  url: `${baseUrl}/user/`,
});
