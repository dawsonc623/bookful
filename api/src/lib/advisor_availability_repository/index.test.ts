import StandardAdvisorAvailabilityRepository  from "./index.class";
import AdvisorAvailabilityRepository          from "./index.type";

import AdvisorAvailabilityCollection  from "../advisor_availability_collection/index.type";

import advisorAvailabilityFactory           from "../../app/advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../../app/advisor_availability_collection/factory";
import availabilityFactory                  from "../../app/availability/factory";
import availabilityCollectionFactory        from "../../app/availability_collection/factory";

describe("AdvisorAvailaiblityRepository", () => {
  let dataSource  : {
    "getAllAdvisorAvailability" : jest.Mock,
    "getAllBookings"            : jest.Mock
  };

  let advisorAvailabilityCollection : AdvisorAvailabilityCollection;

  let advisorAvailabilityDate : Date;

  let advisorAvailabilityRepository : AdvisorAvailabilityRepository;

  beforeEach(() => {
    advisorAvailabilityDate = new Date();

    advisorAvailabilityCollection = advisorAvailabilityCollectionFactory.construct([
      advisorAvailabilityFactory.construct(
        123,
        availabilityCollectionFactory.construct([
          availabilityFactory.construct(
            advisorAvailabilityDate
          )
        ])
      )
    ]);

    dataSource = {
      "getAllAdvisorAvailability" : jest.fn().mockResolvedValue(advisorAvailabilityCollection),
      "getAllBookings"            : jest.fn()
    };

    advisorAvailabilityRepository = new StandardAdvisorAvailabilityRepository(
      dataSource
    );
  });

  test("getting all advisor availability returns the data received from the data source", () => {
    return expect(
      advisorAvailabilityRepository.getAllAdvisorAvailability()
    ).resolves.toBe(
      advisorAvailabilityCollection
    );
  });

  describe("removing availability", () => {
    test("removing an existing availability reports true", () => {
      return expect(
        advisorAvailabilityRepository.removeAvailability(
          123,
          advisorAvailabilityDate
        )
      ).resolves.toBe(true);
    });

    test("removing a non-existing availability reports false", () => {
      return expect(
        advisorAvailabilityRepository.removeAvailability(
          234,
          advisorAvailabilityDate
        )
      ).resolves.toBe(false);
    });

    test("no longer contains removed availability", async () => {
      await advisorAvailabilityRepository.removeAvailability(
        123,
        advisorAvailabilityDate
      );

      return advisorAvailabilityRepository.getAllAdvisorAvailability().then(
        (
          receivedAdvisorAvailabilityCollection
        ) => {
          expect(receivedAdvisorAvailabilityCollection.getCount()).toBe(0);
        }
      );
    });
  });

  describe("caching data received", () => {
    test("getting all advisor availability multiple times only gets the data once", async () => {
      await advisorAvailabilityRepository.getAllAdvisorAvailability();
      await advisorAvailabilityRepository.getAllAdvisorAvailability();

      expect(dataSource.getAllAdvisorAvailability).toHaveBeenCalledTimes(1);
    });

    test("getting all advisor availability then removing one only gets the data once", async () => {
      await advisorAvailabilityRepository.getAllAdvisorAvailability();
      await advisorAvailabilityRepository.removeAvailability(
        123,
        advisorAvailabilityDate
      );

      expect(dataSource.getAllAdvisorAvailability).toHaveBeenCalledTimes(1);
    });

    test("removing an advisor availability then getting the rest only gets the data once", async () => {
      await advisorAvailabilityRepository.removeAvailability(
        123,
        advisorAvailabilityDate
      );
      await advisorAvailabilityRepository.getAllAdvisorAvailability();

      expect(dataSource.getAllAdvisorAvailability).toHaveBeenCalledTimes(1);
    });
  });
});
