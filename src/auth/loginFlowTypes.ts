export interface CognitoResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface LoginSettings {
  authUrl: string;
  clientId: string;
}

export type LoginFlowStatus =
  | "LoggedOut"
  | "LoginSettingsLoading"
  | "LoginSettingsSuccess"
  | "PkceCodeLoading"
  | "PkceCodeSuccess"
  | "TokenLoading"
  | "LoggedIn"
  | "AccessTokenExpired"
  | "TokenRefreshing"
  | "Initialization:ValidatingToken"
  | "Initialization:AccessTokenExpired"
  | "Initialization:TokenRefreshing"
  | "Failure";

export interface LoggedOut {
  status: "LoggedOut";
}

export interface LoginSettingsLoading {
  status: "LoginSettingsLoading";
}

export interface LoginSettingsSuccess {
  status: "LoginSettingsSuccess";
  settings: LoginSettings;
}

export interface PkceCodeLoading {
  status: "PkceCodeLoading";
  settings: LoginSettings;
  pkceVerifier: string;
  xsrfToken: string;
}

export interface PkceCodeSuccess {
  status: "PkceCodeSuccess";
  settings: LoginSettings;
  pkceVerifier: string;
  pkceCode: string;
  xsrfToken: string;
}

export interface TokenLoading {
  status: "TokenLoading";
  settings: LoginSettings;
  pkceCode: string;
}

export interface LoggedIn {
  status: "LoggedIn";
  settings: LoginSettings;
  accessToken: string;
  accessTokenValidTo: Date;
  refreshToken: string;
}

export interface AccessTokenExpired {
  status: "AccessTokenExpired";
  settings: LoginSettings;
  refreshToken: string;
}

export interface TokenRefreshing {
  status: "TokenRefreshing";
  settings: LoginSettings;
  refreshToken: string;
}

export interface InitializationValidatingToken {
  status: "Initialization:ValidatingToken";
  settings: LoginSettings;
  accessToken: string;
  accessTokenValidTo: Date;
  refreshToken: string;
}

export interface InitializationAccessTokenExpired {
  status: "Initialization:AccessTokenExpired";
  settings: LoginSettings;
  refreshToken: string;
}

export interface InitializationTokenRefreshing {
  status: "Initialization:TokenRefreshing";
  settings: LoginSettings;
  refreshToken: string;
}

export interface Failure {
  status: "Failure";
  reason: string;
}

export type LoginFlowState =
  | LoggedOut
  | LoginSettingsLoading
  | LoginSettingsSuccess
  | PkceCodeLoading
  | PkceCodeSuccess
  | TokenLoading
  | LoggedIn
  | AccessTokenExpired
  | TokenRefreshing
  | InitializationValidatingToken
  | InitializationAccessTokenExpired
  | InitializationTokenRefreshing
  | Failure;

// Helpers
type LoginSettingsIsLoaded = Exclude<
  LoginFlowState,
  LoggedOut | LoginSettingsLoading | Failure
>;

export const hasLoginSettings = (
  state: LoginFlowState
): state is LoginSettingsIsLoaded =>
  !["LoggedOut", "LoginSettingsLoading", "Failure"].includes(state.status);

type HasRefreshToken = Extract<
  LoginFlowState,
  LoggedIn | AccessTokenExpired | TokenRefreshing
>;

export const hasRefreshToken = (
  state: LoginFlowState
): state is HasRefreshToken =>
  ["LoggedIn", "AccessTokenExpired", "TokenRefreshing"].includes(state.status);

type HasAccessToken = Extract<LoginFlowState, LoggedIn>;

export const hasAccessToken = (
  state: LoginFlowState
): state is HasAccessToken => state.status === "LoggedIn";

type IsDuringInitialization = Extract<
  LoginFlowState,
  | InitializationAccessTokenExpired
  | InitializationTokenRefreshing
  | InitializationValidatingToken
>;

export const isDuringInitialization = (
  state: LoginFlowState
): state is IsDuringInitialization =>
  [
    "Initialization:AccessTokenExpired",
    "Initialization:TokenRefreshing",
    "Initialization:ValidatingToken",
  ].includes(state.status);

type isAuthenticated = Extract<
  LoginFlowState,
  LoggedIn | AccessTokenExpired | TokenRefreshing
>;

export const isAuthenticated = (
  state: LoginFlowState
): state is IsDuringInitialization =>
  ["LoggedIn", "AccessTokenExpired", "TokenRefreshing"].includes(state.status);
