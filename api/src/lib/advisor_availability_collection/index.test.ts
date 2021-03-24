import StandardAdvisorAvailabilityCollection  from "./index.class";
import AdvisorAvailabilityCollection          from "./index.type";

import AdvisorAvailability from "../advisor_availability/index.type";

import advisorAvailabilityFactory     from "../../app/advisor_availability/factory";
import availabilityFactory            from "../../app/availability/factory";
import availabilityCollectionFactory  from "../../app/availability_collection/factory";

describe("AdvisorAvailabilityCollection", () => {
  let advisorAvailabilityCollection : AdvisorAvailabilityCollection;

  let advisorAvailabilities : AdvisorAvailability[];

  let testingDate : Date;

  beforeEach(() => {
    testingDate = new Date();

    const otherDates = new Date();
    otherDates.setHours(otherDates.getHours() + 1);

    advisorAvailabilities = [
      advisorAvailabilityFactory.construct(
        123,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            testingDate
          ),
          availabilityFactory.construct(
            otherDates
          )
        ])
      ),
      advisorAvailabilityFactory.construct(
        234,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            testingDate
          )
        ])
      ),
      advisorAvailabilityFactory.construct(
        345,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            otherDates
          )
        ])
      )
    ];

    advisorAvailabilityCollection = new StandardAdvisorAvailabilityCollection(
      advisorAvailabilities
    );
  });

  test("reports the correct count", () => {
    expect(advisorAvailabilityCollection.getCount()).toBe(3);
  });

  describe("mapping", () => {
    test("the map function maps all items", () => {
      const mapper = jest.fn();

      advisorAvailabilityCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(3);
      expect(mapper.mock.calls[0][0]).toBe(advisorAvailabilities[0]);
      expect(mapper.mock.calls[1][0]).toBe(advisorAvailabilities[1]);
      expect(mapper.mock.calls[2][0]).toBe(advisorAvailabilities[2]);
    });

    test("the map function returns the mapped values", () => {
      let i = 1;
      const mapper = jest.fn(() => i++);

      const result = advisorAvailabilityCollection.map(
        mapper
      );

      expect(result.length).toBe(3);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(2);
      expect(result[2]).toBe(3);
    });
  });

  describe("removing an availability", () => {
    test("returns false if the availability was not found", () => {
      const found = advisorAvailabilityCollection.removeAvailability(
        890,
        testingDate
      );

      expect(found).toBe(false);
    });

    test("returns true if the availability was found", () => {
      const found = advisorAvailabilityCollection.removeAvailability(
        advisorAvailabilities[0].getAdvisorId(),
        testingDate
      );

      expect(found).toBe(true);
    });

    test("no longer maps removed items", () => {
      const removedAvailability = advisorAvailabilities[1];

      advisorAvailabilityCollection.removeAvailability(
        removedAvailability.getAdvisorId(),
        testingDate
      );

      const mapper = jest.fn();

      advisorAvailabilityCollection.map(
        mapper
      );

      expect(mapper).toHaveBeenCalledTimes(2);
      expect(mapper.mock.calls[0][0]).not.toBe(removedAvailability);
      expect(mapper.mock.calls[1][0]).not.toBe(removedAvailability);
    });
  });
});
