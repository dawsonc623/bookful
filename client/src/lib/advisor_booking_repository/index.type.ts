import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

interface AdvisorBookingRepository
{
  getAllAdvisorBookings() : AdvisorBookingCollection;
}

export default AdvisorBookingRepository;
