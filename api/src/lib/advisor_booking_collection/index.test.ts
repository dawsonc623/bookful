import StandardAdvisorBookingCollection from "./index.class";
import AdvisorBookingCollection         from "./index.type";

import AdvisorBooking from "../advisor_booking/index.type";

import advisorBookingFactory  from "../../app/advisor_booking/factory";

describe("AdvisorBookingCollection", () => {
  let advisorBookingCollection : AdvisorBookingCollection;

  let advisorBookings : AdvisorBooking[];

  let testingDate : Date;

  beforeEach(() => {
    testingDate = new Date();

    const otherDates = new Date();
    otherDates.setHours(otherDates.getHours() + 1);

    advisorBookings = [
      advisorBookingFactory.construct(
        123,
        testingDate,
        "Phil"
      ),
      advisorBookingFactory.construct(
        234,
        otherDates,
        "Phil"
      ),
      advisorBookingFactory.construct(
        234,
        otherDates,
        "Greg"
      )
    ];

    advisorBookingCollection  = new StandardAdvisorBookingCollection(
      advisorBookings
    );
  });

  test("reports the correct count", () => {
    expect(advisorBookingCollection.getCount()).toBe(3);
  });

  describe("mapping", () => {
    test("the map function maps all items", () => {
      const mapper = jest.fn();

      advisorBookingCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(3);
      expect(mapper.mock.calls[0][0]).toBe(advisorBookings[0]);
      expect(mapper.mock.calls[1][0]).toBe(advisorBookings[1]);
      expect(mapper.mock.calls[2][0]).toBe(advisorBookings[2]);
    });

    test("the map function returns the mapped values", () => {
      let i = 1;
      const mapper = jest.fn(() => i++);

      const result = advisorBookingCollection.map(
        mapper
      );

      expect(result.length).toBe(3);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(2);
      expect(result[2]).toBe(3);
    });
  });

  describe("adding a new booking", () => {
    test("maps newly added bookings", () => {
      const mapper = jest.fn();

      const newBooking  = advisorBookingFactory.construct(
        345,
        new Date(),
        "Greg"
      );

      advisorBookingCollection.add(
        newBooking
      );

      advisorBookingCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(4);
      expect(mapper.mock.calls[0][0]).toBe(advisorBookings[0]);
      expect(mapper.mock.calls[1][0]).toBe(advisorBookings[1]);
      expect(mapper.mock.calls[2][0]).toBe(advisorBookings[2]);
      expect(mapper.mock.calls[3][0]).toBe(newBooking);
    });
  });
});
