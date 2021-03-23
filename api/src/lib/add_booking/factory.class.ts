import Responder          from "../responder/index.type";
import AddBookingFactory  from "./factory.type";
import StandardAddBooking from "./index.class";

import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

class StandardAddBookingFactory implements AddBookingFactory
{
  public construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    advisorBookingRepository      : AdvisorBookingRepository
  ) : Responder
  {
    return new StandardAddBooking(
      advisorAvailabilityRepository,
      advisorBookingRepository
    );
  }
}

export default StandardAddBookingFactory;
