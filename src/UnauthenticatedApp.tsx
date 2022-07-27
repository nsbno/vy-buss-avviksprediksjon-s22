import React, { useEffect } from "react";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import {
  Route,
  BrowserRouter as Router,
  useNavigate,
  Navigate,
  Routes,
} from "react-router-dom";
import useLoginFlow, { useLoginFlowStatus } from "auth/useLoginFlow";
import { Login } from "features/Login/Login";
import { Loading } from "components/Loading";
import { getState } from "auth/storage";

const AuthenticateAndRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { state, verifyPkceCode, fetchToken } = useLoginFlow();

  useEffect(() => {
    const storedState = getState();

    if (storedState.status === "PkceCodeLoading") {
      verifyPkceCode();
    }
  }, []);

  useLoginFlowStatus(state, (status) => {
    if (status === "Failure") {
      navigate("/", { replace: true });
    }

    if (status === "PkceCodeSuccess") {
      fetchToken();
    }

    if (status === "LoggedIn") {
      navigate("/", { replace: true });
    }
  });

  return (
    <div className="App-container">
      <p style={{ margin: 0, fontSize: "1rem" }}>Logger deg inn...</p>
      <Loading width="20rem" />
    </div>
  );
};

export const UnauthenticatedApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/login-redirect"
            element={<AuthenticateAndRedirect />}
          ></Route>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};
