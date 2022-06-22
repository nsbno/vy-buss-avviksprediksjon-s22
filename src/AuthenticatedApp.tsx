import { getAuthorization } from "api/getAuthorization";
import { useRemoteData } from "api/remoteData";
import useLoginFlow from "auth/useLoginFlow";
import React from "react";
import { Dashboard } from "features/Dashboard/Dashboard";
import { Loading } from "components/Loading";
import { SubTitle } from "components/Text/StyledTitles";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Button } from "./components/Buttons/button";

export const AuthenticatedApp: React.FC = () => {
  const { logout } = useLoginFlow(false);
  const { remoteData: userData } = useRemoteData(getAuthorization());

  const getContent = () => {
    switch (userData.status) {
      case "Success":
        return (
          <Dashboard
            onClick={logout}
            buttonText={"Logg ut"}
            infoText={"Du er logget inn"}
          />
        );
      case "NotAsked":
      case "Refreshing":
      case "ShouldRefresh":
      case "Loading":
        return <VerifyUser />;
      case "Failure":
        return <UnauthorizedUser />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={getContent()} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const VerifyUser: React.FC = () => {
  return (
    <div className="App-container">
      <p style={{ margin: 0, fontSize: "1rem" }}>Henter brukerdata..</p>
      <Loading width="20rem" />
    </div>
  );
};

const UnauthorizedUser: React.FC = () => {
  const { logout } = useLoginFlow();
  return (
    <div className="App-container">
      <SubTitle>OBS!</SubTitle>
      <p style={{ margin: "0 0 1rem", fontSize: "1rem" }}>
        Du har ikke tilgang
      </p>
      <Button type="button" onClick={logout}>
        Logg ut
      </Button>
    </div>
  );
};
