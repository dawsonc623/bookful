import AdvisorAvailabilityRepository         from "./index.type";
import AdvisorAvailabilityRepositoryFactory  from "./factory.type";
import StandardAdvisorAvailabilityRepository from "./index.class";

import DataSource from "../data_source/index.type";

class StandardAdvisorAvailabilityRepositoryFactory implements AdvisorAvailabilityRepositoryFactory
{
  public construct(
    dataSource  : DataSource
  ) : AdvisorAvailabilityRepository
  {
    return new StandardAdvisorAvailabilityRepository(
      dataSource
    );
  }
}

export default StandardAdvisorAvailabilityRepositoryFactory;
