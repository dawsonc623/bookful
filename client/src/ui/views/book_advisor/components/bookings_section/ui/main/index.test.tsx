import React from "react";

import {
  render
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import BookingsSectionMain from ".";

import AdvisorBookingCollection from "../../../../../../../lib/advisor_booking_collection/index.type";

import advisorBookingFactory            from "../../../../../../../app/advisor_booking/factory";
import advisorBookingCollectionFactory  from "../../../../../../../app/advisor_booking_collection/factory";
import dateFormatter                    from "../../../../../../../app/date_formatter";

describe("BookingsSectionMain", () => {
  let advisorBookings : AdvisorBookingCollection;

  beforeEach(() => {
    advisorBookings = advisorBookingCollectionFactory.construct([
      advisorBookingFactory.construct(
        12321,
        new Date("12/20/2012 12:20 AM"),
        "Phil"
      ),
      advisorBookingFactory.construct(
        32123,
        new Date("12/20/2012 12:20 PM"),
        "Linda"
      )
    ]);
  });

  describe("Initial rendering", () => {
    test("With a collection with contents renders a row per bookings", () => {
      const {
        asFragment,
        getByText
      } = render(
        <BookingsSectionMain
          advisorBookings = {advisorBookings}
          dateFormatter   = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for advisor IDs, student names, and times
      getByText("12321");
      getByText("Phil");
      getByText("12/20/2012 12:20 AM");

      getByText("32123");
      getByText("Linda");
      getByText("12/20/2012 12:20 PM");
    });

    test("With an empty collection renders a row indicating no bookings", () => {
      const emptyBookings = advisorBookingCollectionFactory.construct([]);

      const {
        asFragment,
        getByText
      } = render(
        <BookingsSectionMain
          advisorBookings = {emptyBookings}
          dateFormatter   = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for No Bookings row
      getByText("No Bookings");
    });

    test("With a null collection renders a row indicating no bookings", () => {
      const {
        asFragment,
        getByText
      } = render(
        <BookingsSectionMain
          advisorBookings = {null}
          dateFormatter   = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for No Bookings row
      getByText("No Bookings");
    });

    test("With an undefined collection renders a row indicating no bookings", () => {
      const {
        asFragment,
        getByRole
      } = render(
        <BookingsSectionMain
          advisorBookings = {undefined}
          dateFormatter   = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for progress bar
      getByRole("progressbar");
    });
  });
});
