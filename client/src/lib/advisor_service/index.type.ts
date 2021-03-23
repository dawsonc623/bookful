import AdvisorAvailabilityRepository  from "../advisor_availability_repository/index.type";
import AdvisorBookingCollection       from "../advisor_booking_collection/index.type";

interface AdvisorService
{
  getAllAdvisorBookings() : Promise<AdvisorBookingCollection>

  getAvailabilityForAll() : Promise<AdvisorAvailabilityRepository>;
}

export default AdvisorService;
