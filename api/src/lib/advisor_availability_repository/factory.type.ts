import AdvisorAvailabilityRepository from "./index.type";

import DataSource from "../data_source/index.type";

interface AdvisorAvailabilityRepositoryFactory
{
  construct(
    dataSource  : DataSource
  ) : AdvisorAvailabilityRepository;
}

export default AdvisorAvailabilityRepositoryFactory;
