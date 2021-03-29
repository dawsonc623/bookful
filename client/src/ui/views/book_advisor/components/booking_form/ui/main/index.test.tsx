import React from "react";

import {
  fireEvent,
  render
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import BookingFormMain from ".";

import AdvisorAvailabilityCollection  from "../../../../../../../lib/advisor_availability_collection/index.type";

import advisorAvailabilityFactory           from "../../../../../../../app/advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../../../../../../../app/advisor_availability_collection/factory";
import availabilityFactory                  from "../../../../../../../app/availability/factory";
import availabilityCollectionFactory        from "../../../../../../../app/availability_collection/factory";
import dateFormatter                        from "../../../../../../../app/date_formatter";

const noop  = () => {/* No-op*/};

describe("BookingFormMain", () => {
  let advisorAvailabilityCollection : AdvisorAvailabilityCollection;

  beforeEach(() => {
    advisorAvailabilityCollection = advisorAvailabilityCollectionFactory.construct([
      advisorAvailabilityFactory.construct(
        12321,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            new Date("12/20/2012 12:20 AM")
          ),
          availabilityFactory.construct(
            new Date("12/20/2012 12:20 PM")
          )
        ])
      ),
      advisorAvailabilityFactory.construct(
        32123,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            new Date("12/21/2112 12:21 AM")
          ),
          availabilityFactory.construct(
            new Date("12/21/2112 12:21 PM")
          )
        ])
      )
    ]);
  });

  describe("Initial rendering", () => {
    test("With a collection with contents renders a row and list per advisor", () => {
      const {
        asFragment,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for advisor IDs and times
      getByText("12321");
      getByText("12/20/2012 12:20 AM");
      getByText("12/20/2012 12:20 PM");

      getByText("32123");
      getByText("12/21/2112 12:21 AM");
      getByText("12/21/2112 12:21 PM");
    });

    test("With an empty collection renders a row indicating no availability", () => {
      const emptyAvailability = advisorAvailabilityCollectionFactory.construct([]);

      const {
        asFragment,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {emptyAvailability}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for No Availability row
      getByText("No Availability");
    });

    test("With a null collection renders a row indicating no availability", () => {
      const {
        asFragment,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {null}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for default row
      getByText("No Availability");
    });

    test("With an undefined collection renders progress indicators", () => {
      const {
        asFragment,
        getByRole
      } = render(
        <BookingFormMain
          advisorAvailability = {undefined}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      // Check for progress bar
      getByRole("progressbar");
    });
  });

  describe("Hovering over an availability", () => {
    test("Without a name triggers invalid name field", () => {
      const {
        getByLabelText,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Get an item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Get the name field
      const nameField = getByLabelText("Your Name").parentElement;

      // Hover over the item - trigger invalid change
      fireEvent.mouseOver(availabilityItem);
      expect(nameField).toHaveClass("mdc-text-field--invalid");

      // Stop hovering over the item - trigger invalid to go away
      fireEvent.mouseOut(availabilityItem);
      expect(nameField).not.toHaveClass("mdc-text-field--invalid");
    });

    test("With a name does not trigger invalid name field", () => {
      const {
        getByLabelText,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Get an item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Get the name field
      const nameField = getByLabelText("Your Name") as HTMLInputElement;

      // Enter text into the name field
      fireEvent.change(nameField, {
        "target"  : {
          "value" : "Phil"
        }
      });

      // Hover over the item - does not trigger invalid change
      fireEvent.mouseOver(availabilityItem);
      expect(nameField).not.toHaveClass("mdc-text-field--invalid");
    });
  });

  describe("Entering a name", () => {
    test("Can enter a name if availability exists", () => {
      const {
        getByLabelText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Get the name field
      const nameField = getByLabelText("Your Name") as HTMLInputElement;

      // Enter text into the name field - trigger managed component value
      fireEvent.change(nameField, {
        "target"  : {
          "value" : "Phil"
        }
      });

      expect(nameField.value).toBe("Phil");
    });

    test("Cannot enter a name if availability is empty", () => {
      const emptyAvailability = advisorAvailabilityCollectionFactory.construct([]);

      const {
        queryByLabelText
      } = render(
        <BookingFormMain
          advisorAvailability = {emptyAvailability}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Make sure the name box does not appear
      expect(queryByLabelText("Your Name")).toBeNull();
    });

    test("Cannot enter a name if availability is null", () => {
      const {
        queryByLabelText
      } = render(
        <BookingFormMain
          advisorAvailability = {null}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Make sure the name box does not appear
      expect(queryByLabelText("Your Name")).toBeNull();
    });

    test("Cannot enter a name if availability is undefined", () => {
      const {
        queryByLabelText
      } = render(
        <BookingFormMain
          advisorAvailability = {undefined}
          bookAdvisor         = {noop}
          dateFormatter       = {dateFormatter}
        />
      );

      // Make sure the name box does not appear
      expect(queryByLabelText("Your Name")).toBeNull();
    });
  });

  describe("Clicking an availability", () => {
    test("Fires thes 'bookAdvisor callback if a name is entered", () => {
      const mockBookAdvisor = jest.fn();

      const {
        getByLabelText,
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {mockBookAdvisor}
          dateFormatter       = {dateFormatter}
        />
      );

      // Get an item
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

      // Click the button - trigger the callback
      fireEvent.click(availabilityItem);

      expect(mockBookAdvisor).toHaveBeenCalledWith(
        12321,
        new Date("12/20/2012 12:20 AM"),
        "Phil"
      );
    });

    test("Does not fire the 'bookAdvisor' callback when name field is empty", () => {
      const mockBookAdvisor = jest.fn();

      const {
        getByText
      } = render(
        <BookingFormMain
          advisorAvailability = {advisorAvailabilityCollection}
          bookAdvisor         = {mockBookAdvisor}
          dateFormatter       = {dateFormatter}
        />
      );

      // Get an item
      // This will always have a parent.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const availabilityItem  = getByText("12/20/2012 12:20 AM").parentElement!;

      // Click the button - do not trigger the callback
      fireEvent.click(availabilityItem);

      expect(mockBookAdvisor).not.toHaveBeenCalled();
    });
  });
});
