import React, {
  ReactElement
} from "react";

import ReactDOM from "react-dom";

import "./index.scss";

import {
  Shell
} from "./shell";

function Bookful()  : ReactElement {
  return <Shell />;
}

ReactDOM.render(
  <Bookful />,
  document.getElementById("app")
);
