import React from "react";
import { createRoot } from "react-dom/client";
import "index.css";
import App from "App";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import { SporProvider } from "@vygruppen/spor-react";
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const root = createRoot(document.getElementById("root")!);


root.render(
  <React.StrictMode>
    <SporProvider>
      <App />
    </SporProvider>
  </React.StrictMode>
);

// Registers serviceWorker to enable offline usage.
// Possible to unregister by switching to .unregister()
serviceWorkerRegistration.register();
