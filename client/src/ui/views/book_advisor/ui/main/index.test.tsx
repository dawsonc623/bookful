import React from "react";

import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import BookAdvisorViewMain  from ".";

import advisorAvailabilityFactory           from "../../../../../app/advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../../../../../app/advisor_availability_collection/factory";
import advisorBookingCollectionFactory      from "../../../../../app/advisor_booking_collection/factory";
import availabilityFactory                  from "../../../../../app/availability/factory";
import availabilityCollectionFactory        from "../../../../../app/availability_collection/factory";

const noop  = () => {/* No-op */};

describe("BookAdvisorViewMain", () => {
  let advisorService  : {
    "bookAdvisor"               : jest.Mock,
    "getAllAdvisorAvailability" : jest.Mock,
    "getAllAdvisorBookings"     : jest.Mock
  };

  beforeEach(() => {
    advisorService  = {
      "bookAdvisor"               : jest.fn(),
      "getAllAdvisorAvailability" : jest.fn(),
      "getAllAdvisorBookings"     : jest.fn()
    };
  });

  describe("Initial rendering", () => {
    test("Renders without error while requests are in progress", () => {
      advisorService.getAllAdvisorAvailability.mockReturnValue(new Promise(noop));
      advisorService.getAllAdvisorBookings.mockReturnValue(new Promise(noop));

      const {
        asFragment
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("Renders without error when availability loads but bookings are in progress", async () => {
      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([])
      );

      advisorService.getAllAdvisorBookings.mockReturnValue(new Promise(noop));

      const {
        asFragment
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      await waitFor(async () => {
        await advisorService.getAllAdvisorAvailability();
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("Renders without error when bookings load but availability is in progress", async () => {
      advisorService.getAllAdvisorAvailability.mockReturnValue(new Promise(noop));

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        asFragment
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      await waitFor(async () => {
        await advisorService.getAllAdvisorBookings();
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("Renders without error when requests are finished", async () => {
      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([])
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        asFragment
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      await waitFor(async () => {
        await advisorService.getAllAdvisorAvailability();
        await advisorService.getAllAdvisorBookings();
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Unmounted behavior", () => {
    test("Does not set availability if call resolves after unmounting", async () => {
      let resolveAvailabilityCall = noop;
      advisorService.getAllAdvisorAvailability.mockReturnValue(
        new Promise<void>((r) => resolveAvailabilityCall = r)
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        unmount
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Let the bookings call finish
      await waitFor(async () => {
        await advisorService.getAllAdvisorBookings();
      });

      // Unmount before the availability call "finishes"
      unmount();

      // "Finish" the availability call
      resolveAvailabilityCall();

      // TODO There must be a way to actually "expect" the call not to happen instead of hoping
      // the system catches it for us.
    });

    test("Does not set availability if call rejects after unmounting", async () => {
      let rejectAvailabilityCall = noop;
      advisorService.getAllAdvisorAvailability.mockReturnValue(
        new Promise<void>((_, r) => rejectAvailabilityCall = r)
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        unmount
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Let the bookings call finish
      await waitFor(async () => {
        await advisorService.getAllAdvisorBookings();
      });

      // Unmount before the availability call "finishes"
      unmount();

      // "Finish" the availability call
      rejectAvailabilityCall();

      // TODO There must be a way to actually "expect" the call not to happen instead of hoping
      // the system catches it for us.
    });

    test("Does not set bookings if call resolves after unmounting", async () => {
      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([])
      );

      let resolveBookingsCall = noop;
      advisorService.getAllAdvisorBookings.mockReturnValue(
        new Promise<void>((r) => resolveBookingsCall = r)
      );

      const {
        unmount
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Let the availability call finish
      await waitFor(async () => {
        await advisorService.getAllAdvisorAvailability();
      });

      // Unmount before the bookings call "finishes"
      unmount();

      // "Finish" the bookings call
      resolveBookingsCall();

      // TODO There must be a way to actually "expect" the call not to happen instead of hoping
      // the system catches it for us.
    });

    test("Does not set bookings if call rejects after unmounting", async () => {
      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([])
      );

      let rejectBookingsCall = noop;
      advisorService.getAllAdvisorBookings.mockReturnValue(
        new Promise<void>((_, r) => rejectBookingsCall = r)
      );

      const {
        unmount
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Let the availability call finish
      await waitFor(async () => {
        await advisorService.getAllAdvisorAvailability();
      });

      // Unmount before the bookings call "finishes"
      unmount();

      // "Finish" the bookings call
      rejectBookingsCall();

      // TODO There must be a way to actually "expect" the call not to happen instead of hoping
      // the system catches it for us.
    });
  });

  describe("When requests fail", () => {
    test("Renders an alert message when the advisor availability request fails", async () => {
      advisorService.getAllAdvisorAvailability.mockRejectedValue(new Error("Darn it"));
      advisorService.getAllAdvisorBookings.mockReturnValue(new Promise(noop));

      const {
        asFragment,
        getAllByRole
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the availability progress bar to go away - that indicates the error should have been processed
      await waitForElementToBeRemoved(getAllByRole("progressbar")[0]);

      expect(asFragment()).toMatchSnapshot();
    });

    test("Renders an alert message when the advisor bookings request fails", async () => {
      advisorService.getAllAdvisorAvailability.mockReturnValue(new Promise(noop));
      advisorService.getAllAdvisorBookings.mockRejectedValue(new Error("Darn it"));

      const {
        asFragment,
        getAllByRole
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the bookings progress bar to go away - that indicates the error should have been processed
      await waitForElementToBeRemoved(getAllByRole("progressbar")[1]);

      expect(asFragment()).toMatchSnapshot();
    });

    test("Renders an alert message when both requests fail", async () => {
      advisorService.getAllAdvisorAvailability.mockRejectedValue(new Error("Darn it"));
      advisorService.getAllAdvisorBookings.mockRejectedValue(new Error("Darn it"));

      const {
        asFragment,
        getAllByRole
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the progress bars to go away - that indicates the error should have been processed
      await waitForElementToBeRemoved(getAllByRole("progressbar"));

      expect(asFragment()).toMatchSnapshot();
    });
  });

  // TODO these tests end up testing implementation details. A better approach would be to replace them
  // with integration tests since they can test to see if the API was "hit" versus methods being called.
  describe("When an availability is clicked", () => {
    test("Re-calls advisor service when an advisor is successfully booked", async () => {
      const bookAdvisorResult = Promise.resolve();
      advisorService.bookAdvisor.mockReturnValue(bookAdvisorResult);

      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([
          advisorAvailabilityFactory.construct(
            12321,
            availabilityCollectionFactory.construct([
              availabilityFactory.construct(
                new Date("12/20/2012 12:20 AM")
              )
            ])
          )
        ])
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        getAllByRole,
        getByLabelText,
        getByText
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the availability progress bar to go away - that indicates the availability is rendered
      await waitForElementToBeRemoved(getAllByRole("progressbar")[0]);

      // Get the item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Enter text into the name field
      const nameField = getByLabelText("Your Name");
      fireEvent.change(nameField, {
        "target"  : {
          "value" : "Phil"
        }
      });

      // Click the button
      fireEvent.click(availabilityItem);

      // Allow the book advisor call to finish
      await waitFor(async () => {
        await bookAdvisorResult;
      });

      // Check for advisor service calls - each called once to start and once again after refresh
      expect(advisorService.getAllAdvisorAvailability).toHaveBeenCalledTimes(2);
      expect(advisorService.getAllAdvisorBookings).toHaveBeenCalledTimes(2);
    });

    test("Shows an error when a failure during booking occurs", async () => {
      const rejectingBookAdvisor = () => Promise.reject(new Error("Darn it"));
      advisorService.bookAdvisor.mockImplementation(rejectingBookAdvisor);

      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([
          advisorAvailabilityFactory.construct(
            12321,
            availabilityCollectionFactory.construct([
              availabilityFactory.construct(
                new Date("12/20/2012 12:20 AM")
              )
            ])
          )
        ])
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        asFragment,
        getAllByRole,
        getByLabelText,
        getByText
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the availability progress bar to go away - that indicates the availability is rendered
      await waitForElementToBeRemoved(getAllByRole("progressbar")[0]);

      // Get the item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Enter text into the name field
      const nameField = getByLabelText("Your Name");
      fireEvent.change(nameField, {
        "target"  : {
          "value" : "Phil"
        }
      });

      // Click the button
      fireEvent.click(availabilityItem);

      // Allow the book advisor call to finish
      await waitFor(async () => {
        await expect(advisorService.bookAdvisor()).rejects.toBeDefined();
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("Still re-calls advisor service even when a failure during booking occurs", async () => {
      const rejectingBookAdvisor = () => Promise.reject(new Error("Darn it"));
      advisorService.bookAdvisor.mockImplementation(rejectingBookAdvisor);

      advisorService.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([
          advisorAvailabilityFactory.construct(
            12321,
            availabilityCollectionFactory.construct([
              availabilityFactory.construct(
                new Date("12/20/2012 12:20 AM")
              )
            ])
          )
        ])
      );

      advisorService.getAllAdvisorBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([])
      );

      const {
        getAllByRole,
        getByLabelText,
        getByText
      } = render(
        <BookAdvisorViewMain
          advisorService  = {advisorService}
        />
      );

      // Wait for the availability progress bar to go away - that indicates the availability is rendered
      await waitForElementToBeRemoved(getAllByRole("progressbar")[0]);

      // Get the item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Enter text into the name field
      const nameField = getByLabelText("Your Name");
      fireEvent.change(nameField, {
        "target"  : {
          "value" : "Phil"
        }
      });

      // Click the button
      fireEvent.click(availabilityItem);

      // Allow the book advisor call to finish
      await waitFor(async () => {
        await expect(advisorService.bookAdvisor()).rejects.toBeDefined();
      });

      // Check for advisor service calls - each called once to start and once again after refresh
      expect(advisorService.getAllAdvisorAvailability).toHaveBeenCalledTimes(2);
      expect(advisorService.getAllAdvisorBookings).toHaveBeenCalledTimes(2);
    });
  });
});
