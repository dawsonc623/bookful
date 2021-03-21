import AdvisorAvailabilityRepository         from "./index.type";
import AdvisorAvailabilityRepositoryFactory  from "./factory.type";
import StandardAdvisorAvailabilityRepository from "./index.class";

import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

class StandardAdvisorAvailabilityRepositoryFactory implements AdvisorAvailabilityRepositoryFactory
{
  public construct(
    allAdvisorAvailability  : AdvisorAvailabilityCollection
  ) : AdvisorAvailabilityRepository
  {
    return new StandardAdvisorAvailabilityRepository(
      allAdvisorAvailability
    );
  }
}

export default StandardAdvisorAvailabilityRepositoryFactory;
