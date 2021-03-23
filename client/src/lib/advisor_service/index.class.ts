import AdvisorService from "./index.type";

import AdvisorAvailabilityCollection  from "../advisor_availability_collection/index.type";
import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingCollection       from "../advisor_booking_collection/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

class StandardAdvisorService implements AdvisorService
{
  public constructor(
    private advisorAvailabilityRepository : AdvisorAvailabilityRepository,
    private advisorBookingRepository      : AdvisorBookingRepository
  ) {

  }

  public getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection> {
    return this.advisorAvailabilityRepository.getAllAdvisorAvailability();
  }

  public getAllAdvisorBookings() : Promise<AdvisorBookingCollection> {
    return this.advisorBookingRepository.getAllAdvisorBookings();
  }
}

export default StandardAdvisorService;
