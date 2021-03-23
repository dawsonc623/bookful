import Responder from "../responder/index.type";

import {
  Request,
  Response
} from "express";

import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

class AddBooking implements Responder
{
  public constructor(
    private advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    private advisorBookingRepository      : AdvisorBookingRepository
  ) {

  }

  public async respond(
    request   : Request,
    response  : Response
  ) : Promise<void> {
    try {
      const {
        advisorId,
        studentName,

        date  : dateString
      } = request.body;

      const date  = new Date(dateString);

      const availabilityExisted = await this.advisorAvailabilityRepository.removeAvailability(
        advisorId,
        date
      );

      if (availabilityExisted) {
        await this.advisorBookingRepository.addBooking(
          advisorId,
          new Date(date),
          studentName
        );

        response.send();
      } else {
        response.status(404);
        response.send("No such availability.");
      }
    } catch {
      response.status(500);
      response.send("Could not book advisor.");
    }
  }
}

export default AddBooking;
