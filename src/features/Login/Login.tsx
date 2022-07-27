import React from "react";
import useLoginFlow from "auth/useLoginFlow";
import logo from "vy-logo-white.svg";
import { Button } from "components/Buttons/button";
import { SubTitle } from "components/Text/StyledTitles";
import styled from "styled-components";

const LoginContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Login = () => {
  const { fetchSettings, login } = useLoginFlow();

  return (
    <LoginContainer>
      <SubTitle>Login</SubTitle>
      <img src={logo} className="App-logo" alt="logo" />
      <Button type="button" onClick={() => fetchSettings().then(login)}>
        Logg inn
      </Button>
      <p style={{ margin: 0, fontSize: "1rem" }}>Du er logget ut</p>
    </LoginContainer>
  );
};
