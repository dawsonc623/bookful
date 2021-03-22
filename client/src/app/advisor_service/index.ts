import advisorServiceFactory from "./factory";

import advisorAvailabilityFactory           from "../advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory";
import advisorAvailabilityRepositoryFactory from "../advisor_availability_repository/factory";
import advisorBookingCollectionFactory      from "../advisor_booking_collection/factory";
import advisorBookingFactory                from "../advisor_booking/factory";
import advisorBookingRepositoryFactory      from "../advisor_booking_repository/factory";
import availabilityFactory                  from "../availability/factory";
import availabilityCollectionFactory        from "../availability_collection/factory";

const advisorService  = advisorServiceFactory.construct(
  advisorAvailabilityCollectionFactory,
  advisorAvailabilityFactory,
  advisorAvailabilityRepositoryFactory,
  advisorBookingCollectionFactory,
  advisorBookingFactory,
  advisorBookingRepositoryFactory,
  availabilityCollectionFactory,
  availabilityFactory
);

export default advisorService;
