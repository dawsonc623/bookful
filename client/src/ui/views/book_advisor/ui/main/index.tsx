import React, {
  ReactElement,

  useCallback,
  useEffect,
  useState
} from "react";

import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle
} from "@rmwc/dialog";

import {
  Typography
} from "@rmwc/typography";

import AdvisorAvailabilityCollection  from "../../../../../lib/advisor_availability_collection/index.type";
import AdvisorBookingCollection       from "../../../../../lib/advisor_booking_collection/index.type";
import AdvisorService                 from "../../../../../lib/advisor_service/index.type";

import {
  BookingForm
} from "../../components/booking_form";

import {
  BookingsSection
} from "../../components/bookings_section";

import "./index.scss";

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

  // Error messaging
  const [
    errors,
    setErrors
  ] = useState<string[]>(
    []
  );

  const addError  = (
    error : string
  ) => {
    errors.push(error);
    setErrors([...errors]);
  };

  const clearErrors = useCallback(
    () => {
      setErrors(
        []
      );
    },
    []
  );

  // Fetch the advisor availability data

  const [
    advisorAvailability,
    setAdvisorAvailability
  ] = useState<AdvisorAvailabilityCollection | null>();

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
        },
        () => {
          if (!unmounted) {
            setAdvisorAvailability(
              null
            );

            addError(
              "Could not load advisor availability!"
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
  ] = useState<AdvisorBookingCollection | null>();

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
        },
        () => {
          if (!unmounted) {
            setAdvisorBookings(
              null
            );

            addError(
              "Could not load advisor bookings!"
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
      } catch (error) {
        addError(
          "Could not book advisor!"
        );
      }

      // Refresh the view regardless of error - helpful to the user if the availability
      // changed and caused the booking error.
      setRefresh(
        (r) => !r
      );
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
      <Dialog
        open    = {errors.length > 0}
        onClose = {clearErrors}
      >
        <DialogTitle>An Error Occurred</DialogTitle>
        <DialogContent>
          {
            errors.map(
              (
                error,
                index
              ) => {
                return (
                  <React.Fragment
                    key = {`${error}${index}`}
                  >
                    {error}<br />
                  </React.Fragment>
                );
              }
            )
          }
        </DialogContent>
        <DialogActions>
          <DialogButton
            action = "close"
          >
            OK
          </DialogButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
