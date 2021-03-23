import Responder from "../responder/index.type";

import AdvisorBookingRepository from "../advisor_booking_repository/index.type";

interface GetAllBookingsFactory
{
  construct(
    advisorBookingRepository  : AdvisorBookingRepository
  ) : Responder;
}

export default GetAllBookingsFactory;
