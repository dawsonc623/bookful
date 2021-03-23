import Responder from "../responder/index.type";

import {
  AdvisorBookingResponse
} from "@bookful/data";

import {
  Request,
  Response
} from "express";

class GetAllBookings implements Responder
{
  public respond(
    _request  : Request,
    response  : Response<AdvisorBookingResponse>
  ) : void {
    response.send({
      "bookings"  : [
        {
          "advisorId"   : 3456,
          "date"        : "2021-03-23T11:00:00.000Z",
          "studentName" : "John Smith"
        }
      ]
    });
  }
}

export default GetAllBookings;
