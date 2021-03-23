import AdvisorService         from "./index.type";
import AdvisorServiceFactory  from "./factory.type";
import StandardAdvisorService from "./index.class";

import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

class StandardAdvisorServiceFactory implements AdvisorServiceFactory
{
  public construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    advisorBookingRepository      : AdvisorBookingRepository
  ) : AdvisorService
  {
    return new StandardAdvisorService(
      advisorAvailabilityRepository,
      advisorBookingRepository
    );
  }
}

export default StandardAdvisorServiceFactory;
