import AdvisorBookingRepository         from "./index.type";
import AdvisorBookingRepositoryFactory  from "./factory.type";
import StandardAdvisorBookingRepository from "./index.class";

import AdvisorBookingFactory            from "../advisor_booking/factory.type";
import AdvisorBookingCollectionFactory  from "../advisor_booking_collection/factory.type";

class StandardAdvisorBookingRepositoryFactory implements AdvisorBookingRepositoryFactory
{
  public construct(
    advisorBookingCollectionFactory : AdvisorBookingCollectionFactory,
    advisorBookingFactory           : AdvisorBookingFactory
  ) : AdvisorBookingRepository
  {
    return new StandardAdvisorBookingRepository(
      advisorBookingCollectionFactory,
      advisorBookingFactory
    );
  }
}

export default StandardAdvisorBookingRepositoryFactory;
