import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

interface AdvisorBookingRepository
{
  getAllAdvisorBookings() : Promise<AdvisorBookingCollection>;
}

export default AdvisorBookingRepository;
