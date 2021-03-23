import AdvisorBooking from "../advisor_booking/index.type";

interface AdvisorBookingCollection
{
  add(
    booking : AdvisorBooking
  ) : void;

  map<T>(
    mapper  : (
      booking : AdvisorBooking
    ) => T
  ) : T[];
}

export default AdvisorBookingCollection;
