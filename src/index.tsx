import React from "react";
import { createRoot } from "react-dom/client";
import "index.css";
import App from "App";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import { SporProvider } from "@vygruppen/spor-react";

const root = createRoot(document.getElementById("root")!);

var api = "https://j6ngwm8og5.execute-api.us-east-1.amazonaws.com/DEV/user"

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
