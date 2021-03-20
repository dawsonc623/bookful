import React, {
  ReactElement
} from "react";

import ReactDOM from "react-dom";

function Bookful()  : ReactElement {
  return <p>Hello, world!</p>;
}

ReactDOM.render(
  <Bookful />,
  document.getElementById("app")
);
