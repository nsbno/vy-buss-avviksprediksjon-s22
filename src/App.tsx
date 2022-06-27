import React from "react";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import {
  isDuringInitialization,
  isAuthenticated,
  LoginFlowState,
} from "auth/loginFlowTypes";
import useLoginFlow from "auth/useLoginFlow";
import { UnauthenticatedApp } from "UnauthenticatedApp";
import { AuthenticatedApp } from "AuthenticatedApp";
import { Dashboard } from "features/Dashboard/Dashboard";
import { logout } from "auth/loginFlow";
import { SporProvider } from "@vygruppen/spor-react";
import { NotificationPage } from "pages/notificationPage/NotificationPage";

type AppStatus = "Initialising" | "Unauthenticated" | "Authenticated";

const getAppStatus = (state: LoginFlowState): AppStatus => {
  if (isDuringInitialization(state)) {
    return "Initialising";
  }

  if (isAuthenticated(state)) {
    return "Authenticated";
  }

  return "Unauthenticated";
};

function App() {
  // const { state } = useLoginFlow(true);
  // const appStatus = getAppStatus(state);

  // switch (appStatus) {
  //   case "Initialising":
  //     return (
  //       <ErrorBoundary>
  //         <div className="App-container">
  //           <p style={{ margin: 0, fontSize: "1rem" }}>Intialiserer app..</p>
  //         </div>
  //       </ErrorBoundary>
  //     );

  //   case "Authenticated":
  //     return <AuthenticatedApp />;

  //   case "Unauthenticated":
  //     return <UnauthenticatedApp />;
  // }

  return <NotificationPage />
}

export default App;
