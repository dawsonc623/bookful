import Responder from "../responder/index.type";

import {
  AdvisorAvailabilityResponse
} from "@bookful/data";

import {
  Request,
  Response
} from "express";

import AdvisorAvailabilityRepository from "../advisor_availability_repository/index.type";

class GetAllAdvisorAvailability implements Responder
{
  public constructor(
    private advisorAvailabilityRepository : AdvisorAvailabilityRepository
  ) {

  }

  public async respond(
    _request  : Request,
    response  : Response<AdvisorAvailabilityResponse>
  ) : Promise<void> {
    try {
      const advisorAvailabilities = await this.advisorAvailabilityRepository.getAllAdvisorAvailability();

      response.send({
        "advisorAvailabilities" : advisorAvailabilities.map(
          (
            advisorAvailability
          ) => {
            return {
              "advisorId" : advisorAvailability.getAdvisorId(),

              "availabilities"  : advisorAvailability.getAllAvailability().map(
                (
                  availability
                ) => {
                  return {
                    "date"  : availability.getDate().toISOString()
                  };
                }
              )
            };
          }
        )
      });
    } catch {
      response.status(500);
      response.send();
    }
  }
}

export default GetAllAdvisorAvailability;
