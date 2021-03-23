import advisorBookingRepositoryFactory from "./factory";

import advisorBookingFactory            from "../advisor_booking/factory";
import advisorBookingCollectionFactory  from "../advisor_booking_collection/factory";

const advisorBookingRepository  = advisorBookingRepositoryFactory.construct(
  advisorBookingCollectionFactory,
  advisorBookingFactory
);

export default advisorBookingRepository;
