import AdvisorBooking from "../advisor_booking/index.type";

interface AdvisorBookingCollection
{
  map<T>(
    mapper  : (
      booking : AdvisorBooking
    ) => T
  ) : T[];
}

export default AdvisorBookingCollection;
