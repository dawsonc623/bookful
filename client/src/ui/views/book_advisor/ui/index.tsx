import React, {
  ReactElement
} from "react";

import BookAdvisorViewMain from "./main";

import advisorService from "../../../../app/advisor_service";

export default function BookAdvisorView() : ReactElement
{
  return (
    <BookAdvisorViewMain
      advisorService  = {advisorService}
    />
  );
}
