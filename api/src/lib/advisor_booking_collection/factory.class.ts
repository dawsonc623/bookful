import AdvisorBookingCollection         from "./index.type";
import AdvisorBookingCollectionFactory  from "./factory.type";
import StandardAdvisorBookingCollection from "./index.class";

import AdvisorBooking from "../advisor_booking/index.type";

class StandardAdvisorBookingCollectionFactory implements AdvisorBookingCollectionFactory
{
  public construct(
    advisorBookings : AdvisorBooking[]
  ) : AdvisorBookingCollection
  {
    return new StandardAdvisorBookingCollection(
      advisorBookings
    );
  }
}

export default StandardAdvisorBookingCollectionFactory;
