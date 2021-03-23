import addBookingFactory from "./factory";

import advisorAvailabilityRepository  from "../advisor_availability_repository";
import advisorBookingRepository       from "../advisor_booking_repository";

const addBooking  = addBookingFactory.construct(
  advisorAvailabilityRepository,
  advisorBookingRepository
);

export default addBooking;
