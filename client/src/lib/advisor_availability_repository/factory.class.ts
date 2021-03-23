import AdvisorAvailabilityRepository         from "./index.type";
import AdvisorAvailabilityRepositoryFactory  from "./factory.type";
import StandardAdvisorAvailabilityRepository from "./index.class";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorAvailabilityRepositoryFactory implements AdvisorAvailabilityRepositoryFactory
{
  public construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    apiOrigin                             : string,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory
  ) : AdvisorAvailabilityRepository
  {
    return new StandardAdvisorAvailabilityRepository(
      advisorAvailabilityCollectionFactory,
      advisorAvailabilityFactory,
      apiOrigin,
      availabilityCollectionFactory,
      availabilityFactory
    );
  }
}

export default StandardAdvisorAvailabilityRepositoryFactory;
