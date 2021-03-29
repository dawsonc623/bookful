import React, {
  ReactElement
} from "react";

import BookingsSectionMain from "./main";

import AdvisorBookingCollection from "../../../../../../lib/advisor_booking_collection/index.type";

import dateFormatter from "../../../../../../app/date_formatter";

interface BookingsSectionProps
{
  advisorBookings : AdvisorBookingCollection | null | undefined;
}

export default function BookingsSection(
  props : BookingsSectionProps
) : ReactElement
{
  const {
    advisorBookings
  } = props;

  return (
    <BookingsSectionMain
      advisorBookings = {advisorBookings}
      dateFormatter   = {dateFormatter}
    />
  );
}
