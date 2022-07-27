import * as uuid from "uuid";
import { LoginFlowState } from "./loginFlowTypes";

const STORED_STATE_KEY = "LOGIN_STATE_V1";

interface StateChangeListener {
  fn: (state: LoginFlowState) => void;
  key: string;
}

let listeners: StateChangeListener[] = [];

export const setState = (state: LoginFlowState): LoginFlowState => {
  localStorage.setItem(STORED_STATE_KEY, JSON.stringify(state));
  listeners.forEach((l) => l.fn(state));

  return state;
};

export const getState = (): LoginFlowState => {
  const storedStateString = localStorage.getItem(STORED_STATE_KEY);

  if (storedStateString == null) {
    return setState({ status: "LoggedOut" });
  }

  const parsed = JSON.parse(storedStateString) as LoginFlowState;

  if (
    parsed.status === "LoggedIn" ||
    parsed.status === "Initialization:ValidatingToken"
  ) {
    return {
      ...parsed,
      accessTokenValidTo: new Date(parsed.accessTokenValidTo),
    };
  }

  return parsed;
};

export const onStateChange = (
  listener: (state: LoginFlowState) => void
): (() => void) => {
  const key = uuid.v4();

  listeners = listeners.concat({
    fn: listener,
    key,
  });

  return () => {
    listeners = listeners.filter((l) => l.key !== key);
  };
};
