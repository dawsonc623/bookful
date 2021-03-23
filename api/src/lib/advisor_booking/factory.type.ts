import AdvisorBooking from "./index.type";

interface AdvisorBookingFactory
{
  construct(
    advisorId   : number,
    date        : Date,
    studentName : string
  ) : AdvisorBooking;
}

export default AdvisorBookingFactory;
