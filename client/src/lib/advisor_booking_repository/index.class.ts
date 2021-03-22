import AdvisorBookingRepository from "./index.type";

import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

class StandardAdvisorBookingRepository implements AdvisorBookingRepository
{
  public constructor(
    private allAdvisorBookings  : AdvisorBookingCollection
  ) {

  }

  public getAllAdvisorBookings() : AdvisorBookingCollection {
    return this.allAdvisorBookings;
  }
}

export default StandardAdvisorBookingRepository;
