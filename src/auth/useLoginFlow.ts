/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import * as loginFlow from "./loginFlow";
import { LoginFlowState, LoginFlowStatus } from "./loginFlowTypes";
import { getState, onStateChange } from "./storage";

export const useLoginFlowStatus = (
  state: LoginFlowState,
  onStatus: (status: LoginFlowStatus) => void
) => {
  useEffect(() => {
    onStatus(state.status);
  }, [state.status]);
};

const createState = (init: boolean): LoginFlowState => {
  const initialState = getState();

  // If the app was aborted during initialization, reset to logged out
  if (
    initialState.status === "Initialization:AccessTokenExpired" ||
    initialState.status === "Initialization:TokenRefreshing" ||
    initialState.status === "Initialization:ValidatingToken"
  ) {
    return {
      status: "LoggedOut",
    };
  }

  if (initialState.status === "LoggedIn" && init) {
    return {
      status: "Initialization:ValidatingToken",
      accessToken: initialState.accessToken,
      accessTokenValidTo: initialState.accessTokenValidTo,
      refreshToken: initialState.refreshToken,
      settings: initialState.settings,
    };
  }

  return initialState;
};

export const useLoginFlow = (shouldInitialize = false) => {
  const [state, setHookState] = useState<LoginFlowState>(
    createState(shouldInitialize)
  );

  useEffect(() => {
    const unregisterListener = onStateChange(setHookState);

    if (shouldInitialize && state.status === "Initialization:ValidatingToken") {
      loginFlow.validateToken();
    }

    return unregisterListener;
  }, []);

  return {
    state,
    fetchSettings: loginFlow.fetchSettings,
    login: loginFlow.login,
    verifyPkceCode: loginFlow.verifyPkceCode,
    fetchToken: loginFlow.fetchToken,
    reset: loginFlow.resetState,
    logout: loginFlow.logout,
    refreshToken: loginFlow.refreshToken,
    setExpiredAccessToken: loginFlow.setExpiredAccessToken,
  };
};

export default useLoginFlow;
