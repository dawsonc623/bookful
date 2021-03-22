import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../advisor_booking_repository/index.type";

interface AdvisorService
{
  getAvailabilityForAll() : Promise<AdvisorAvailabilityRepository>;

  getBookingsForAll() : Promise<AdvisorBookingRepository>;
}

export default AdvisorService;
