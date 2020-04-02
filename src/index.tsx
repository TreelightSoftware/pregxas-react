/// <reference path="../types.d.ts" />
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";

// css 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import "../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./css/open-iconic-bootstrap.min.css";
import "./css/app.css";

if(process.env.REACT_APP_SENTRY_DSN){
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN// "https://f1833ae37a6242b1a3259ef3bb0534c8@sentry.io/1419296",
  });
}


// is local storage is set, we will want to set the info
if(window.localStorage.user){
  let user = window.localStorage.user;
  if(typeof user === "string"){
    user = JSON.parse(user);
  }
  const env = process.env.REACT_APP_ENV === "production" ? "production" : "develop";
  Sentry.configureScope((scope: any) => {
    scope.setExtra("environment", env);
    scope.setUser(user);
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
