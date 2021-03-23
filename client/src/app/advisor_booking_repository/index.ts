import advisorBookingRepositoryFactory from "./factory";

import advisorBookingFactory            from "../advisor_booking/factory";
import advisorBookingCollectionFactory  from "../advisor_booking_collection/factory";
import configuration                    from "../configuration";

const advisorBookingRepository  = advisorBookingRepositoryFactory.construct(
  advisorBookingCollectionFactory,
  advisorBookingFactory,
  configuration.getApiOrigin()
);

export default advisorBookingRepository;
