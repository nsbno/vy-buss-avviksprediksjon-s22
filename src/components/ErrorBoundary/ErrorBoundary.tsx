import React, { ErrorInfo } from "react";
import { log } from "common/log";
import { BodyText, SubTitle } from "components/Text/StyledTitles";

type ErrorState = {
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    log.error(error?.message, errorInfo?.componentStack?.toString());
  }

  render() {
    const { props, state } = this;
    if (state.errorInfo) {
      return (
        <div style={{ padding: "1rem" }}>
          <SubTitle>En feil har oppstått</SubTitle>
          <BodyText>
            Feilen er rapportert til utviklerne. Oppdater siden for å gå tilbake
          </BodyText>
          <BodyText>
            Dersom feilen er gjentakende, send gjerne en liten beskrivelse om
            hvordan du gikk frem da feilen oppstod
          </BodyText>
        </div>
      );
    }
    return props.children;
  }
}
