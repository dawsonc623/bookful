import advisorBookingRepositoryFactory from "./factory";

import advisorBookingFactory  from "../advisor_booking/factory";
import dataSource             from "../data_source";

const advisorBookingRepository  = advisorBookingRepositoryFactory.construct(
  advisorBookingFactory,
  dataSource
);

export default advisorBookingRepository;
