import React from "react";

import {
  render
} from "@testing-library/react";

import "whatwg-fetch";

import Shell from ".";

describe("Shell", () => {
  test("Renders without error", async () => {
    const {
      asFragment
    } = render(<Shell />);

    expect(asFragment()).toMatchSnapshot();
  });
});
