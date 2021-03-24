import StandardDataSource from "./index.class";
import DataSource         from "./index.type";

import advisorAvailabilityFactory           from "../../app/advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../../app/advisor_availability_collection/factory";
import advisorBookingCollectionFactory      from "../../app/advisor_booking_collection/factory";
import availabilityFactory                  from "../../app/availability/factory";
import availabilityCollectionFactory        from "../../app/availability_collection/factory";
import httpResponseFactory                  from "../../app/http_response/factory";

describe("DataSource", () => {
  let httpClient  : {
    get : jest.Mock
  };
  let dataSource  : DataSource;

  beforeEach(() => {
    httpClient  = {
      "get" : jest.fn()
    };

    dataSource = new StandardDataSource(
      advisorAvailabilityCollectionFactory,
      advisorAvailabilityFactory,
      advisorBookingCollectionFactory,
      availabilityCollectionFactory,
      availabilityFactory,
      "http://my.availability.net/",
      httpClient
    );
  });

  describe("getting advisor availability", () => {
    test("returns the right number of items based on succesful API response", async () => {
      httpClient.get.mockResolvedValue(
        httpResponseFactory.construct(
          JSON.stringify({
            "2019-08-27": {
              "2019-08-27T14:00:00-04:00": 372955,
              "2019-08-27T13:00:00-04:00": 473265
            },
            "2019-08-22": {
              "2019-08-22T04:00:00-04:00": 419054,
              "2019-08-22T12:30:00-04:00": 372955,
              "2019-08-22T17:00:00-04:00": 419054
            }
          }),
          true
        )
      );

      const advisorAvailability = await dataSource.getAllAdvisorAvailability();

      expect(advisorAvailability.getCount()).toBe(3);
    });

    test("returns a rejection if the response is not OK", async () => {
      httpClient.get.mockResolvedValue(
        httpResponseFactory.construct(
          "",
          false
        )
      );

      return expect(
        dataSource.getAllAdvisorAvailability()
      ).rejects;
    });
  });

  describe("getting bookings", () => {
    test("returns an empty collection (system always starts off clean)", async () => {
      const bookings = await dataSource.getAllBookings();

      expect(bookings.getCount()).toBe(0);
    });
  });
});
