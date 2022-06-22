export const verifyThatTokenIsStillValid = (accessTokenValidTo: Date) => {
  return accessTokenValidTo.getTime() > new Date().getTime();
};

export const createValidToDate = (expiresInSeconds: number, offset: number) =>
  new Date(new Date().getTime() + expiresInSeconds * 1000 - offset);
