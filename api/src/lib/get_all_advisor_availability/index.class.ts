import Responder from "../responder/index.type";

import {
  AdvisorAvailabilityResponse
} from "@bookful/data";

import {
  Request,
  Response
} from "express";

class GetAllAdvisorAvailability implements Responder
{
  public respond(
    _request  : Request,
    response  : Response<AdvisorAvailabilityResponse>
  ) : void {
    response.send({
      "advisorAvailabilities" : [
        {
          "advisorId" : 1234,
          "availabilities"  : [
            {
              "date"  : "2021-03-21T22:30:00.000Z"
            },
            {
              "date"  : "2021-03-22T14:00:00.000Z"
            }
          ]
        },
        {
          "advisorId" : 2345,
          "availabilities"  : [
            {
              "date"  : "2021-03-22T00:00:00.000Z"
            },
            {
              "date"  : "2021-04-23T18:30:00.000Z"
            }
          ]
        }
      ]
    });
  }
}

export default GetAllAdvisorAvailability;
