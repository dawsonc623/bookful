import AdvisorAvailabilityCollection  from "../advisor_availability_collection/index.type";
import AdvisorBookingCollection       from "../advisor_booking_collection/index.type";

interface DataSource
{
  getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection>;

  getAllBookings()  : Promise<AdvisorBookingCollection>;
}

export default DataSource;
