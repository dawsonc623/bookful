import Responder from "../responder/index.type";

import {
  AdvisorBookingResponse
} from "@bookful/data";

import {
  Request,
  Response
} from "express";

import AdvisorBookingRepository from "../advisor_booking_repository/index.type";

class GetAllBookings implements Responder
{
  public constructor(
    private advisorBookingRepository  : AdvisorBookingRepository
  ) {

  }

  public async respond(
    _request  : Request,
    response  : Response<AdvisorBookingResponse>
  ) : Promise<void> {
    const bookings  = await this.advisorBookingRepository.getAllBookings();

    response.send({
      "bookings"  : bookings.map(
        (
          booking
        ) => {
          return {
            "advisorId"   : booking.getAdvisorId(),
            "date"        : booking.getDate().toISOString(),
            "studentName" : booking.getStudentName()
          };
        }
      )
    });
  }
}

export default GetAllBookings;
