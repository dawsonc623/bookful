import AdvisorService         from "./index.type";
import AdvisorServiceFactory  from "./factory.type";
import StandardAdvisorService from "./index.class";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorAvailabilityRepositoryFactory from "../advisor_availability_repository/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorServiceFactory implements AdvisorServiceFactory
{
  public construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    advisorAvailabilityRepositoryFactory  : AdvisorAvailabilityRepositoryFactory,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory
  ) : AdvisorService
  {
    return new StandardAdvisorService(
      advisorAvailabilityCollectionFactory,
      advisorAvailabilityFactory,
      advisorAvailabilityRepositoryFactory,
      availabilityCollectionFactory,
      availabilityFactory
    );
  }
}

export default StandardAdvisorServiceFactory;
