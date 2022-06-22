import styled, { css } from "styled-components";

type CommonProps = {
  weight?: string;
};

export const BodyTextCss = css`
    font-size: 13px;
    font-weight: ${(props: CommonProps) =>
      props.weight ? props.weight : "normal"}
    color: ${({ theme }) => theme.textColor};
    word-break: break-word;
`;

const SubTitle = styled.h4`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  word-break: break-word;
`;

const BodyText = styled.p`
  ${BodyTextCss}
`;

export { SubTitle, BodyText };
