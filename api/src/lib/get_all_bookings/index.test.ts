import GetAllBookings  from "./index.class";

import {
  Request,
  Response
} from "express";

import Responder  from "../responder/index.type";

import advisorBookingCollectionFactory  from "../../app/advisor_booking_collection/factory";
import advisorBookingFactory            from "../../app/advisor_booking/factory";

describe("GetAllBookings", () => {
  let mockAdvisorBookingsRepository : {
    addBooking      : jest.Mock,
    getAllBookings  : jest.Mock
  };

  let getAllBookings  : Responder;

  let response  : {
    send    : jest.Mock,
    status  : jest.Mock
  };

  beforeEach(() => {
    mockAdvisorBookingsRepository = {
      "addBooking"      : jest.fn(),
      "getAllBookings"  : jest.fn()
    };

    getAllBookings  = new GetAllBookings(
      mockAdvisorBookingsRepository
    );

    response = {
      "send"    : jest.fn(),
      "status"  : jest.fn()
    };
  });

  describe("successfully getting bookings", () => {
    test("responds with the expected items", async () => {
      const testDate = new Date();

      mockAdvisorBookingsRepository.getAllBookings.mockResolvedValue(
        advisorBookingCollectionFactory.construct([
          advisorBookingFactory.construct(
            123,
            testDate,
            "Phil"
          )
        ])
      );

      await getAllBookings.respond(
        {} as Request,
        response as unknown as Response
      );

      expect(response.status).not.toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith({
        "bookings" : [
          {
            "advisorId"   : 123,
            "date"        : testDate.toISOString(),
            "studentName" : "Phil"
          }
        ]
      });
    });
  });

  describe("encountering errors getting bookings", () => {
    test("responds with an error response", async () => {
      mockAdvisorBookingsRepository.getAllBookings.mockRejectedValue(new Error());

      await getAllBookings.respond(
        {} as Request,
        response as unknown as Response
      );

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
