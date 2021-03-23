import advisorServiceFactory from "./factory";

import advisorAvailabilityRepository  from "../advisor_availability_repository";
import advisorBookingRepository       from "../advisor_booking_repository";

const advisorService  = advisorServiceFactory.construct(
  advisorAvailabilityRepository,
  advisorBookingRepository
);

export default advisorService;
