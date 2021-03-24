import StandardAvailabilityCollection  from "./index.class";
import AvailabilityCollection          from "./index.type";

import Availability from "../availability/index.type";

import availabilityFactory  from "../../app/availability/factory";

describe("AvailabilityCollection", () => {
  let availabilityCollection : AvailabilityCollection;

  let availabilities : Availability[];

  let testingDate : Date;

  beforeEach(() => {
    testingDate = new Date();

    const otherDate = new Date();
    otherDate.setHours(otherDate.getHours() + 1);

    availabilities = [
      availabilityFactory.construct(
        testingDate
      ),
      availabilityFactory.construct(
        otherDate
      )
    ];

    availabilityCollection = new StandardAvailabilityCollection(
      availabilities
    );
  });

  test("reports the correct count", () => {
    expect(availabilityCollection.getCount()).toBe(2);
  });

  describe("mapping", () => {
    test("the map function maps all items", () => {
      const mapper = jest.fn();

      availabilityCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(2);
      expect(mapper.mock.calls[0][0]).toBe(availabilities[0]);
      expect(mapper.mock.calls[1][0]).toBe(availabilities[1]);
    });

    test("the map function returns the mapped values", () => {
      let i = 1;
      const mapper = jest.fn(() => i++);

      const result = availabilityCollection.map(
        mapper
      );

      expect(result.length).toBe(2);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(2);
    });
  });

  describe("removing a date", () => {
    test("returns false if the date was not found", () => {
      const nonExistentDate = new Date();
      nonExistentDate.setHours(nonExistentDate.getHours() + 2);

      const found = availabilityCollection.removeDate(
        nonExistentDate
      );

      expect(found).toBe(false);
    });

    test("returns true if the date was found", () => {
      const found = availabilityCollection.removeDate(
        testingDate
      );

      expect(found).toBe(true);
    });

    test("no longer maps removed items", () => {
      const removedDate = availabilities[0];

      availabilityCollection.removeDate(
        testingDate
      );

      const mapper = jest.fn();

      availabilityCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(1);
      expect(mapper.mock.calls[0][0]).not.toBe(removedDate);
    });
  });
});
