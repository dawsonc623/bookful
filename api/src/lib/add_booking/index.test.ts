import AddBooking from "./index.class";

import {
  Request,
  Response
} from "express";

import Responder  from "../responder/index.type";

describe("AddBooking", () => {
  let mockAdvisorAvailabilityRepository : {
    getAllAdvisorAvailability : jest.Mock,
    removeAvailability        : jest.Mock
  };

  let mockAdvisorBookingRepository  : {
    addBooking      : jest.Mock;
    getAllBookings  : jest.Mock;
  };

  let addBooking  : Responder;

  let requestBody : {
    advisorId   : number,
    date        : string,
    studentName : string
  };

  let request   : Request;
  let response  : Response;

  beforeEach(() => {
    mockAdvisorAvailabilityRepository = {
      "getAllAdvisorAvailability" : jest.fn(),
      "removeAvailability"        : jest.fn()
    };

    mockAdvisorBookingRepository  = {
      "addBooking"      : jest.fn(),
      "getAllBookings"  : jest.fn()
    };

    addBooking  = new AddBooking(
      mockAdvisorAvailabilityRepository,
      mockAdvisorBookingRepository
    );

    requestBody = {
      "advisorId"   : 123,
      "date"        : (new Date()).toISOString(),
      "studentName" : "Phil"
    };

    request = {
      "body"  : requestBody
    } as Request;

    response = {
      "send"    : jest.fn(),
      "status"  : jest.fn()
    } as unknown as Response;
  });

  describe("successfully adding a booking", () => {
    beforeEach(() => {
      mockAdvisorAvailabilityRepository.removeAvailability.mockResolvedValueOnce(true);
      mockAdvisorBookingRepository.addBooking.mockResolvedValueOnce(null);
    });

    test("responds with a success response", async () => {
      await addBooking.respond(
        request,
        response
      );

      expect(response.status).not.toHaveBeenCalled();
      expect(response.send).toHaveBeenCalled();
    });
  });

  describe("trying to add a non-available booking", () => {
    beforeEach(() => {
      mockAdvisorAvailabilityRepository.removeAvailability.mockResolvedValueOnce(false);
    });

    test("responds with an error response", async () => {
      await addBooking.respond(
        request,
        response
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalled();
    });
  });

  describe("some error occurred", () => {
    beforeEach(() => {
      mockAdvisorAvailabilityRepository.removeAvailability.mockRejectedValueOnce(new Error("error"));
    });

    test("responds with an error response", async () => {
      await addBooking.respond(
        request,
        response
      );

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
