import advisorAvailabilityRepositoryFactory from "./factory";

import dataSource from "../data_source";

const advisorAvailabilityRepository  = advisorAvailabilityRepositoryFactory.construct(
  dataSource
);

export default advisorAvailabilityRepository;
