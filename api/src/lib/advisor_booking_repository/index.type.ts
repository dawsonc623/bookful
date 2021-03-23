import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

interface AdvisorBookingRepository
{
  getAllBookings()  : Promise<AdvisorBookingCollection>;
}

export default AdvisorBookingRepository;
