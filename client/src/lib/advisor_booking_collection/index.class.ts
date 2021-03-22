import AdvisorBookingRepository from "./index.type";

import AdvisorBooking from "../advisor_booking/index.type";

class StandardAdvisorBookingRepository implements AdvisorBookingRepository
{
  public constructor(
    private advisorBookings : AdvisorBooking[]
  ) {

  }

  public map<T>(
    mapper  : (
      booking : AdvisorBooking
    ) => T
  ) : T[] {
    return this.advisorBookings.map(
      mapper
    );
  }
}

export default StandardAdvisorBookingRepository;
