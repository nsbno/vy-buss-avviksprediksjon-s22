import { mockApiGet, mockApiPost } from "common/testUtils";
import * as loginFlow from "./loginFlow";

const { location } = window;

describe("loginFlow", () => {
  beforeEach(() => {
    loginFlow.resetState();
  });

  describe("getState", () => {
    it("with no stored state - creates default state", () => {
      const state = loginFlow.getState();

      expect(state.status).toBe("LoggedOut");
    });

    it("with stored state - returns stored state", () => {
      loginFlow.setState({
        status: "LoginSettingsLoading",
      });

      const state = loginFlow.getState();

      expect(state.status).toBe("LoginSettingsLoading");
    });
  });

  describe("fetchSettings", () => {
    it("with no parameters - fetches settings", async () => {
      mockApiGet({
        authenticationUrl: "test",
        clientId: "k4dru88oemecuoguf5sv4iuf8",
      });

      const promise = loginFlow.fetchSettings();

      expect(loginFlow.getState().status).toBe("LoginSettingsLoading");

      await promise;

      const state = loginFlow.getState();

      expect(state.status).toBe("LoginSettingsSuccess");
      expect((state as any).settings.clientId).toBe(
        "k4dru88oemecuoguf5sv4iuf8"
      );
    });
  });

  describe("login", () => {
    const assignMock = jest.fn();
    beforeEach(() => {
      delete (window as any).location;
      window.location = {
        assign: assignMock,
      } as unknown as Location;
    });

    afterEach(() => {
      window.location = location;
    });

    it("with correct state - redirects user to login page", () => {
      loginFlow.setState({
        status: "LoginSettingsSuccess",
        settings: {
          authUrl: "test",
          clientId: "k4dru88oemecuoguf5sv4iuf8",
        },
      });

      loginFlow.login();

      expect(assignMock).toBeCalledTimes(1);
      expect(loginFlow.getState().status).toBe("PkceCodeLoading");
    });
  });

  describe("verifyPkceCode", () => {
    beforeEach(() => {
      delete (window as any).location;
      window.location = {
        search: "?code=123",
      } as unknown as Location;
    });

    afterEach(() => {
      window.location = location;
    });

    it("with correct state and code in url - sets status to success", () => {
      loginFlow.setState({
        status: "PkceCodeLoading",
        settings: {
          authUrl: "test",
          clientId: "k4dru88oemecuoguf5sv4iuf8",
        },
        pkceVerifier: "verifier",
        xsrfToken: "token",
      });

      loginFlow.verifyPkceCode();

      const state = loginFlow.getState();
      expect(state.status).toBe("PkceCodeSuccess");
      expect((state as any).pkceCode).toBe("123");
    });
  });

  describe("fetchToken", () => {
    it("with correct state - fetches access token", async () => {
      mockApiPost({
        access_token: "access",
        refresh_token: "refresh",
      });

      loginFlow.setState({
        status: "PkceCodeSuccess",
        settings: {
          authUrl: "test",
          clientId: "k4dru88oemecuoguf5sv4iuf8",
        },
        pkceCode: "123",
        pkceVerifier: "verifier",
        xsrfToken: "token",
      });

      await loginFlow.fetchToken();

      const state = loginFlow.getState();

      expect(state.status).toBe("LoggedIn");
      expect((state as any).accessToken).toBe("access");
      expect((state as any).refreshToken).toBe("refresh");
    });
  });

  // refreshToken - med gyldig refresh token - henter token
  describe("refreshToken", () => {
    it("with valid refresh token - fetches new access token", async () => {
      mockApiPost({
        access_token: "access2",
      });

      loginFlow.setState({
        status: "AccessTokenExpired",
        settings: {
          authUrl: "test",
          clientId: "k4dru88oemecuoguf5sv4iuf8",
        },
        refreshToken: "refresh1",
      });

      const promise = loginFlow.refreshToken();

      const firstState = loginFlow.getState();
      expect(firstState.status).toBe("TokenRefreshing");

      await promise;
      const secondState = loginFlow.getState();

      expect(secondState.status).toBe("LoggedIn");
      expect((secondState as any).accessToken).toBe("access2");
      expect((secondState as any).refreshToken).toBe("refresh1");
    });
  });
  // refreshToken - med ugyldig refresh token - logger ut
  // (Appen håndterer redirect?)
  // Se på mulige feil med at flere auth-state endringer trigges samtidig

  describe("onStateChange", () => {
    it("with one listener - triggers on state change", (done) => {
      const removeListener = loginFlow.onStateChange((state) => {
        expect(state.status).toBe("LoginSettingsSuccess");
        removeListener();
        done();
      });

      loginFlow.setState({
        status: "LoginSettingsSuccess",
        settings: {
          authUrl: "asdf",
          clientId: "asdf",
        },
      });
    });
  });
});
