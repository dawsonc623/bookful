import getAllBookingsFactory from "./factory";

import advisorBookingRepository from "../advisor_booking_repository";

const getAllBookings  = getAllBookingsFactory.construct(
  advisorBookingRepository
);

export default getAllBookings;
