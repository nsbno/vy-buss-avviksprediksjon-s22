import appConfig from "appConfig.json";

export enum Environment {
  DEVELOPMENT = "DEV",
  TEST = "TEST",
  STAGE = "STAGE",
  PRODUCTION = "PROD",
}

export const getCurrentEnvironment = (): Environment => {
  if (
    process.env.NODE_ENV === "development" ||
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("127.0.0.1")
  ) {
    return Environment.DEVELOPMENT;
  }

  if (window.location.origin.endsWith(appConfig.environments.TEST)) {
    return Environment.TEST;
  }

  if (window.location.origin.endsWith(appConfig.environments.STAGE)) {
    return Environment.STAGE;
  }

  if (window.location.origin.endsWith(appConfig.environments.PROD)) {
    return Environment.PRODUCTION;
  }

  throw new Error("Fant ikke riktig miljø");
};
