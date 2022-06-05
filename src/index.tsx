import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                <App />
            </QueryParamProvider>
        </BrowserRouter>
    </React.StrictMode>
);
