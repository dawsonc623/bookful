import React from "react";

import {
  render
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import BookingsSection from ".";

import advisorBookingCollectionFactory from "../../../../../../app/advisor_booking_collection/factory";

describe("BookingsSection", () => {
  test("Renders without error", () => {
    const advisorBookingCollection = advisorBookingCollectionFactory.construct([]);

    const {
      asFragment
    } = render(
      <BookingsSection
        advisorBookings = {advisorBookingCollection}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});