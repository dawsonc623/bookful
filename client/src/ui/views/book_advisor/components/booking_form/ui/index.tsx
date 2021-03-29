import React, {
  ReactElement
} from "react";

import BookingFormMain from "./main";

import AdvisorAvailabilityCollection  from "../../../../../../lib/advisor_availability_collection/index.type";

import dateFormatter from "../../../../../../app/date_formatter";

interface BookingFormProps
{
  advisorAvailability : AdvisorAvailabilityCollection | null | undefined;

  bookAdvisor : (
    advisorId   : number,
    date        : Date,
    studentName : string
  ) => void;
}

export default function BookingForm(
  props : BookingFormProps
) : ReactElement
{
  const {
    advisorAvailability,
    bookAdvisor
  } = props;

  return (
    <BookingFormMain
      advisorAvailability = {advisorAvailability}
      bookAdvisor         = {bookAdvisor}
      dateFormatter       = {dateFormatter}
    />
  );
}
