import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

Sentry.init({
	dsn:
		"https://a7488499d39c4c7f860304d2a77c8b92@o233916.ingest.sentry.io/5653362",
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 0.25,
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector("#root"),
);

serviceWorkerRegistration.register();

reportWebVitals();
