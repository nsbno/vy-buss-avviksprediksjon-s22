import { post } from "api/apiClient";
import pkceChallenge from "pkce-challenge";
import * as uuid from "uuid";
import {
  CognitoResponse,
  LoginFlowState,
  LoginFlowStatus,
  LoginSettings,
} from "./loginFlowTypes";
import { getLoginData } from "./getLoginData";
import { getState, onStateChange, setState } from "./storage";
import { registerInterceptor } from "./refreshTokenInterceptor";
import {
  createValidToDate,
  verifyThatTokenIsStillValid,
} from "./tokenValidation";

const REDIRECT_URL = `${window.location.origin}/login-redirect`;

registerInterceptor();

const loggedInStates: LoginFlowStatus[] = [
  "LoggedIn",
  "AccessTokenExpired",
  "TokenRefreshing",
];

export const isAuthenticated = (): boolean =>
  loggedInStates.includes(getState().status);

interface LoginUrlParameters {
  authUrl: string;
  clientId: string;
  pkceChallengeCode: string;
  redirectUrl: string;
  cognitoState: string;
}

const getLoginUrl = ({
  authUrl,
  clientId,
  pkceChallengeCode,
  redirectUrl,
  cognitoState,
}: LoginUrlParameters): string =>
  `${authUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&code_challenge=${pkceChallengeCode}&redirect_uri=${redirectUrl}&code_challenge_method=S256&state=${cognitoState}`;

// Steps
export const resetState = (): LoginFlowState => {
  return setState({ status: "LoggedOut" });
};

export { getState, setState, onStateChange };

const fail = (reason: string): void => {
  setState({
    status: "Failure",
    reason,
  });
};

const failWithIllegalTransition = (
  from: LoginFlowStatus,
  to: LoginFlowStatus
): void => fail(`Attempted illegal status transition: ${from} -> ${to}`);

export const fetchSettings = async (
  override?: LoginSettings
): Promise<LoginFlowState> => {
  setState({
    status: "LoginSettingsLoading",
  });

  if (override == null) {
    try {
      const loginSettings = await getLoginData();
      return setState({
        status: "LoginSettingsSuccess",
        settings: loginSettings,
      });
    } catch (caughtError) {
      fail(caughtError as string);
      throw caughtError;
    }
  } else {
    return setState({
      status: "LoginSettingsSuccess",
      settings: override,
    });
  }
};

export const login = (): void => {
  const state = getState();
  if (state.status === "LoginSettingsSuccess") {
    const xsrfToken = uuid.v4();
    const pkceKeys = pkceChallenge();

    setState({
      status: "PkceCodeLoading",
      settings: state.settings,
      xsrfToken,
      pkceVerifier: pkceKeys.code_verifier,
    });

    window.location.assign(
      getLoginUrl({
        authUrl: state.settings.authUrl,
        clientId: state.settings.clientId,
        cognitoState: xsrfToken,
        pkceChallengeCode: pkceKeys.code_challenge,
        redirectUrl: REDIRECT_URL,
      })
    );
  }
};

export const verifyPkceCode = (): void => {
  const state = getState();
  if (state.status === "PkceCodeLoading") {
    const pkceCode = new URLSearchParams(window.location.search).get("code");

    if (pkceCode != null) {
      setState({
        status: "PkceCodeSuccess",
        settings: state.settings,
        pkceVerifier: state.pkceVerifier,
        pkceCode,
        xsrfToken: state.xsrfToken,
      });
    } else {
      fail("Pkce code not found");
    }
  } else {
    failWithIllegalTransition(state.status, "PkceCodeSuccess");
  }
};

export const fetchToken = async (): Promise<LoginFlowState> => {
  const state = getState();

  if (state.status === "PkceCodeSuccess") {
    setState({
      status: "TokenLoading",
      pkceCode: state.pkceCode,
      settings: state.settings,
    });

    const startTime = new Date().getTime();

    try {
      const cognitoResponse = await post<string, CognitoResponse>(
        `${state.settings.authUrl}/oauth2/token`,
        `code=${state.pkceCode}&code_verifier=${state.pkceVerifier}&redirect_uri=${REDIRECT_URL}&client_id=${state.settings.clientId}&grant_type=authorization_code`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = cognitoResponse;

      const requestDuration = new Date().getTime() - startTime;

      return setState({
        status: "LoggedIn",
        accessToken,
        accessTokenValidTo: createValidToDate(expiresIn, requestDuration),
        refreshToken,
        settings: state.settings,
      });
    } catch (caughtError) {
      fail("Error while fetching token");
      throw caughtError;
    }
  } else {
    failWithIllegalTransition(state.status, "PkceCodeSuccess");

    throw new Error("Error while fetching token");
  }
};

export const setExpiredAccessToken = (): void => {
  const state = getState();

  if (state.status === "LoggedIn" || state.status === "TokenRefreshing") {
    setState({
      status: "AccessTokenExpired",
      settings: state.settings,
      refreshToken: state.refreshToken,
    });
  } else {
    failWithIllegalTransition(state.status, "AccessTokenExpired");
  }
};

export const refreshToken = async (
  duringInitalization = false
): Promise<LoginFlowState> => {
  const state = getState();

  if (
    state.status === "AccessTokenExpired" ||
    state.status === "Initialization:AccessTokenExpired"
  ) {
    setState({
      status: duringInitalization
        ? "Initialization:TokenRefreshing"
        : "TokenRefreshing",
      settings: state.settings,
      refreshToken: state.refreshToken,
    });

    const startTime = new Date().getTime();

    try {
      const response = await post<string, CognitoResponse>(
        `${state.settings.authUrl}/oauth2/token`,
        `client_id=${state.settings.clientId}&grant_type=refresh_token&refresh_token=${state.refreshToken}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token: accessToken, expires_in: expiresIn } = response;

      const requestDuration = new Date().getTime() - startTime;

      return setState({
        status: "LoggedIn",
        accessToken,
        accessTokenValidTo: createValidToDate(expiresIn, requestDuration),
        refreshToken: state.refreshToken,
        settings: state.settings,
      });
    } catch (error) {
      logout();
      throw error;
    }
  } else {
    failWithIllegalTransition(state.status, "TokenRefreshing");

    throw new Error("Failed while refreshing token");
  }
};

export const logout = (): LoginFlowState => {
  return setState({ status: "LoggedOut" });
};

export const validateToken = async () => {
  const state = getState();

  if (state.status === "LoggedIn") {
    setState({
      status: "Initialization:ValidatingToken",
      accessToken: state.accessToken,
      accessTokenValidTo: state.accessTokenValidTo,
      refreshToken: state.refreshToken,
      settings: state.settings,
    });

    const tokenIsStillValid = verifyThatTokenIsStillValid(
      state.accessTokenValidTo
    );

    if (tokenIsStillValid) {
      setState({
        status: "LoggedIn",
        accessToken: state.accessToken,
        accessTokenValidTo: state.accessTokenValidTo,
        refreshToken: state.refreshToken,
        settings: state.settings,
      });
    } else {
      setState({
        status: "Initialization:AccessTokenExpired",
        refreshToken: state.refreshToken,
        settings: state.settings,
      });
      // TODO - dette må håndteres bedre
      refreshToken(true);
    }
  }
};
