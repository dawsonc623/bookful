import AdvisorService from "./index.type";

import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

interface AdvisorServiceFactory
{
  construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    advisorBookingRepository      : AdvisorBookingRepository
  ) : AdvisorService;
}

export default AdvisorServiceFactory;
