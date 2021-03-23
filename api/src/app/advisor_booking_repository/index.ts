import advisorBookingRepositoryFactory from "./factory";

import dataSource from "../data_source";

const advisorBookingRepository  = advisorBookingRepositoryFactory.construct(
  dataSource
);

export default advisorBookingRepository;
