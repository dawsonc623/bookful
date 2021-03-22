import AdvisorBookingRepository         from "./index.type";
import AdvisorBookingRepositoryFactory  from "./factory.type";
import StandardAdvisorBookingRepository from "./index.class";

import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

class StandardAdvisorBookingRepositoryFactory implements AdvisorBookingRepositoryFactory
{
  public construct(
    allAdvisorBookings  : AdvisorBookingCollection
  ) : AdvisorBookingRepository
  {
    return new StandardAdvisorBookingRepository(
      allAdvisorBookings
    );
  }
}

export default StandardAdvisorBookingRepositoryFactory;
