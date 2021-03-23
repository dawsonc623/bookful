import AdvisorAvailabilityRepository from "./index.type";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

interface AdvisorAvailabilityRepositoryFactory
{
  construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    apiOrigin                             : string,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory
  ) : AdvisorAvailabilityRepository;
}

export default AdvisorAvailabilityRepositoryFactory;
