import Responder from "../responder/index.type";

import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

interface AddBookingFactory
{
  construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    advisorBookingRepository      : AdvisorBookingRepository
  ) : Responder;
}

export default AddBookingFactory;
