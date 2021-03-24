import GetAllAdvisorAvailability  from "./index.class";

import {
  Request,
  Response
} from "express";

import Responder  from "../responder/index.type";

import advisorAvailabilityFactory           from "../../app/advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../../app/advisor_availability_collection/factory";
import availabilityFactory                  from "../../app/availability/factory";
import availabilityCollectionFactory        from "../../app/availability_collection/factory";

describe("GetAllAdvisorAvailability", () => {
  let mockAdvisorAvailabilityRepository : {
    getAllAdvisorAvailability : jest.Mock,
    removeAvailability        : jest.Mock
  };

  let getAllAdvisorAvailability  : Responder;

  let response  : {
    send    : jest.Mock,
    status  : jest.Mock
  };

  beforeEach(() => {
    mockAdvisorAvailabilityRepository = {
      "getAllAdvisorAvailability" : jest.fn(),
      "removeAvailability"        : jest.fn()
    };

    getAllAdvisorAvailability  = new GetAllAdvisorAvailability(
      mockAdvisorAvailabilityRepository
    );

    response = {
      "send"    : jest.fn(),
      "status"  : jest.fn()
    };
  });

  describe("successfully getting advisor availability", () => {
    test("responds with the expected items", async () => {
      const testDate = new Date();

      mockAdvisorAvailabilityRepository.getAllAdvisorAvailability.mockResolvedValue(
        advisorAvailabilityCollectionFactory.construct([
          advisorAvailabilityFactory.construct(
            123,
            availabilityCollectionFactory.construct([
              availabilityFactory.construct(
                testDate
              )
            ])
          )
        ])
      );

      await getAllAdvisorAvailability.respond(
        {} as Request,
        response as unknown as Response
      );

      expect(response.status).not.toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith({
        "advisorAvailabilities" : [
          {
            "advisorId"       : 123,
            "availabilities"  : [
              {
                "date"  : testDate.toISOString()
              }
            ]
          }
        ]
      });
    });
  });

  describe("encountering errors getting advisor availability", () => {
    test("responds with an error response", async () => {
      mockAdvisorAvailabilityRepository.getAllAdvisorAvailability.mockRejectedValue(new Error());

      await getAllAdvisorAvailability.respond(
        {} as Request,
        response as unknown as Response
      );

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
