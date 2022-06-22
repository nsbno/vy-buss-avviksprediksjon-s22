import React from "react";
import { createRoot } from "react-dom/client";
import "index.css";
import App from "App";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registers serviceWorker to enable offline usage.
// Possible to unregister by switching to .unregister()
serviceWorkerRegistration.register();
