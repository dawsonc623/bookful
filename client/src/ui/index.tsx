import React, {
  ReactElement
} from "react";

import ReactDOM from "react-dom";

import {
  BookAdvisorView
} from "./views/book_advisor";

function Bookful()  : ReactElement {
  return <BookAdvisorView />;
}

ReactDOM.render(
  <Bookful />,
  document.getElementById("app")
);
