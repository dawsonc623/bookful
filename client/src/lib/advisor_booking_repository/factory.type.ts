import AdvisorBookingRepository from "./index.type";

import AdvisorBookingFactory            from "../advisor_booking/factory.type";
import AdvisorBookingCollectionFactory  from "../advisor_booking_collection/factory.type";

interface AdvisorBookingRepositoryFactory
{
  construct(
    advisorBookingCollectionFactory : AdvisorBookingCollectionFactory,
    advisorBookingFactory           : AdvisorBookingFactory,
    apiOrigin                       : string
  ) : AdvisorBookingRepository;
}

export default AdvisorBookingRepositoryFactory;
