import React, {
  ReactElement
} from "react";

import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from "@rmwc/top-app-bar";

import {
  ThemeProvider
} from "@rmwc/theme";

import {
  BookAdvisorView
} from "../../../views/book_advisor";

import "./index.scss";

export default function ShellMain() : ReactElement
{
  return (
    <ThemeProvider
      className = "shell"

      options = {{
        "primary"   : "#666",
        "secondary" : "#333"
      }}
    >
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle>Bookful</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <BookAdvisorView />
    </ThemeProvider>
  );
}
