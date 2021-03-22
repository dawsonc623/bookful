import AdvisorBookingCollection from "./index.type";

import AdvisorBooking from "../advisor_booking/index.type";

interface AdvisorBookingCollectionFactory
{
  construct(
    advisorBookings : AdvisorBooking[]
  ) : AdvisorBookingCollection;
}

export default AdvisorBookingCollectionFactory;
