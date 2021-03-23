import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

interface AdvisorBookingRepository
{
  addBooking(
    advisorId   : number,
    date        : Date,
    studentName : string
  )  : Promise<void>;

  getAllAdvisorBookings() : Promise<AdvisorBookingCollection>;
}

export default AdvisorBookingRepository;
