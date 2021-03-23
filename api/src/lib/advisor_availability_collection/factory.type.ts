import AdvisorAvailabilityCollection from "./index.type";

import AdvisorAvailability from "../advisor_availability/index.type";

interface AdvisorAvailabilityCollectionFactory
{
  construct(
    advisorAvailability : AdvisorAvailability[]
  ) : AdvisorAvailabilityCollection;
}

export default AdvisorAvailabilityCollectionFactory;
