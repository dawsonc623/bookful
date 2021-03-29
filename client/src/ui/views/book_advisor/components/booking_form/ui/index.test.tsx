import React from "react";

import {
  render
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import BookingForm  from ".";

import advisorAvailabilityCollectionFactory from "../../../../../../app/advisor_availability_collection/factory";

const noop  = () => {/* No-op*/};

describe("BookingForm", () => {
  test("Renders without error", () => {
    const advisorAvailabilityCollection = advisorAvailabilityCollectionFactory.construct([]);

    const {
      asFragment
    } = render(
      <BookingForm
        advisorAvailability = {advisorAvailabilityCollection}
        bookAdvisor         = {noop}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});