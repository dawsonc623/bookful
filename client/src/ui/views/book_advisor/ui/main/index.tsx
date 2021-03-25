import React, {
  ReactElement,

  useCallback,
  useEffect,
  useState
} from "react";

import {
  Typography
} from "@rmwc/typography";

import AdvisorAvailabilityCollection  from "../../../../../lib/advisor_availability_collection/index.type";
import AdvisorBookingCollection       from "../../../../../lib/advisor_booking_collection/index.type";
import AdvisorService                 from "../../../../../lib/advisor_service/index.type";

import {
  BookingsSection
} from "../../components/bookings_section";

import "./index.scss";
import { BookingForm } from "../../components/booking_form";

interface BookAdvisorViewMainProps
{
  advisorService  : AdvisorService;
}

export default function BookAdvisorViewMain(
  props : BookAdvisorViewMainProps
) : ReactElement
{
  const {
    advisorService
  } = props;

  // Trigger to refresh lists
  const [
    refresh,
    setRefresh
  ] = useState(
    true
  );

  // Grab and format the current date to show to the student
  // Using Date.now() makes this easier to test

  const currentDate       = new Date(Date.now());
  const currentDateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  // Fetch the advisor availability data

  const [
    advisorAvailability,
    setAdvisorAvailability
  ] = useState<AdvisorAvailabilityCollection | null>(null);

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getAllAdvisorAvailability().then(
        (
          newAdvisorAvailability
        ) => {
          if (!unmounted) {
            setAdvisorAvailability(
              newAdvisorAvailability
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService,
      refresh
    ]
  );

  // Grab the advisor booking data

  const [
    advisorBookings,
    setAdvisorBookings
  ] = useState<AdvisorBookingCollection | null>(null);

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getAllAdvisorBookings().then(
        (
          newAdvisorBookings
        ) => {
          if (!unmounted) {
            setAdvisorBookings(
              newAdvisorBookings
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService,
      refresh
    ]
  );

  // Create a new booking

  const bookAdvisor = useCallback(
    async (
      advisorId   : number,
      date        : Date,
      studentName : string
    ) => {
      try {
        await advisorService.bookAdvisor(
          advisorId,
          date,
          studentName
        );

        setRefresh(
          (r) => !r
        );
      } catch (e) {
        // TODO Alert the user of error
        e;
      }
    },
    []
  );

  return (
    <div
      className = "bookAdvisorView"
    >
      <div>
        <div
          className = "title"
        >
          <Typography
            use = "headline3"
          >
            Book Time with an Advisor
          </Typography>
        </div>
        <span>Today is {currentDateString}</span>
      </div>
      <BookingForm
        advisorAvailability = {advisorAvailability}
        bookAdvisor         = {bookAdvisor}
      />
      <BookingsSection
        advisorBookings = {advisorBookings}
      />
    </div>
  );
}
