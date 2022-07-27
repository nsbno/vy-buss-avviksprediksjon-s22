import styled from "styled-components";

export const Button = styled.button`
  background-color: #b2dfd7;
  color: #00453e;
  border: 2px solid #b2dfd7;
  box-shadow: 0 0 0 3px #b2dfd7;
  border-radius: 30px;
  min-height: 42px;
  padding: 0 24px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  cursor: pointer;

  &:hover {
    background: #99d5ca;
    color: #00453e;
    border-color: #99d5ca;
    box-shadow: 0 0 0 3px #99d5ca;
  }
`;
