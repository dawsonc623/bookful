import AdvisorBookingRepository from "./index.type";

import AdvisorBookingCollection from "../advisor_booking_collection/index.type";

interface AdvisorBookingRepositoryFactory
{
  construct(
    allAdvisorBookings  : AdvisorBookingCollection
  ) : AdvisorBookingRepository;
}

export default AdvisorBookingRepositoryFactory;
