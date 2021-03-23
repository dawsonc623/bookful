import Responder             from "../responder/index.type";
import GetAllBookingsFactory from "./factory.type";
import GetAllBookings        from "./index.class";

import AdvisorBookingRepository from "../advisor_booking_repository/index.type";

class StandardGetAllBookingsFactory implements GetAllBookingsFactory
{
  public construct(
    advisorBookingRepository  : AdvisorBookingRepository
  ) : Responder
  {
    return new GetAllBookings(
      advisorBookingRepository
    );
  }
}

export default StandardGetAllBookingsFactory;
