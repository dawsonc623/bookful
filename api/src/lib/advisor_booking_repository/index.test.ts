import StandardAdvisorBookingRepository from "./index.class";
import AdvisorBookingRepository         from "./index.type";

import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

import advisorBookingCollectionFactory  from "../../app/advisor_booking_collection/factory";
import advisorBookingFactory            from "../../app/advisor_booking/factory";

describe("AdvisorBookingRepository", () => {
  let dataSource  : {
    getAllAdvisorAvailability : jest.Mock,
    getAllBookings            : jest.Mock
  };

  let advisorBookingCollection  : AdvisorBookingCollection;

  let advisorBookingRepository : AdvisorBookingRepository;

  beforeEach(() => {
    advisorBookingCollection  = advisorBookingCollectionFactory.construct([
      advisorBookingFactory.construct(
        123,
        new Date(),
        "Phil"
      )
    ]);

    dataSource = {
      "getAllAdvisorAvailability" : jest.fn(),
      "getAllBookings"            : jest.fn().mockResolvedValue(advisorBookingCollection)
    };

    advisorBookingRepository  = new StandardAdvisorBookingRepository(
      advisorBookingFactory,
      dataSource
    );
  });

  test("getting all bookings returns the data received from the data source", () => {
    return expect(
      advisorBookingRepository.getAllBookings()
    ).resolves.toBe(
      advisorBookingCollection
    );
  });

  test("retains a newly added booking", async () => {
    await advisorBookingRepository.addBooking(
      234,
      new Date(),
      "Phil"
    );

    return advisorBookingRepository.getAllBookings().then(
      (
        receivedAdvisorBookingCollection
      ) => {
        expect(receivedAdvisorBookingCollection.getCount()).toBe(2);
      }
    );
  });

  describe("caching data received", () => {
    test("getting all bookings multiple times only gets data from the data source once", async () => {
      await advisorBookingRepository.getAllBookings();
      await advisorBookingRepository.getAllBookings();

      expect(dataSource.getAllBookings).toHaveBeenCalledTimes(1);
    });

    test("adding a new booking then getting all bookings only gets the data from the data source once", async () => {
      await advisorBookingRepository.addBooking(
        234,
        new Date(),
        "Phil"
      );
      await advisorBookingRepository.getAllBookings();

      expect(dataSource.getAllBookings).toHaveBeenCalledTimes(1);
    });

    test("getting all bookings and then adding a new bokking only gets the data from the data source once", async () => {
      await advisorBookingRepository.getAllBookings();
      await advisorBookingRepository.addBooking(
        234,
        new Date(),
        "Phil"
      );

      expect(dataSource.getAllBookings).toHaveBeenCalledTimes(1);
    });
  });
});
