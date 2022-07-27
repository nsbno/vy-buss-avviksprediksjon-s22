import styled, { keyframes } from "styled-components";

const flow = keyframes`
    0%{background-position: 0 50%}
    50%{background-position: 50% 100%}
`;

export const Loading = styled.div`
  background: linear-gradient(
    -45deg,
    #fff,
    #889bb259,
    #cad7e6,
    #cceae4,
    #888b8e
  );
  animation: ${flow} 1.5s ease-in infinite;
  background-size: 600%;
  -webkit-text-fill-color: transparent;
  border-radius: 0.5rem;
  height: 0.8rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: ${(props: { width?: string }) => (props.width ? props.width : "100%")};
`;
