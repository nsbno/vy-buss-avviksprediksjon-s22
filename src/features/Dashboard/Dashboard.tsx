import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import logo from "vy-logo-white.svg";
import { Button } from "components/Buttons/button";
import React from "react";
import { SubTitle } from "components/Text/StyledTitles";
import styled from "styled-components";

const DashboardContainer = styled.div`
  background-color: #606568;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #fff;
`;

export const Dashboard = ({
  onClick,
  buttonText,
  infoText,
}: {
  onClick: () => void;
  buttonText: string;
  infoText: string;
}) => {
  return (
    <ErrorBoundary>
      <DashboardContainer>
        <SubTitle>Dashboard</SubTitle>
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="button" onClick={onClick}>
          {buttonText}
        </Button>
        <p style={{ margin: 0, fontSize: "1rem" }}>{infoText}</p>
      </DashboardContainer>
    </ErrorBoundary>
  );
};
