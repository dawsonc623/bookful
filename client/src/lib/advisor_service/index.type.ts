import AdvisorAvailabilityCollection  from "../advisor_availability_collection/index.type";
import AdvisorBookingCollection       from "../advisor_booking_collection/index.type";

interface AdvisorService
{
  getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection>;

  getAllAdvisorBookings() : Promise<AdvisorBookingCollection>
}

export default AdvisorService;
