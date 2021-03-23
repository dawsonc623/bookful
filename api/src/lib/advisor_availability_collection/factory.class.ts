import AdvisorAvailabilityCollection         from "./index.type";
import AdvisorAvailabilityCollectionFactory  from "./factory.type";
import StandardAdvisorAvailabilityCollection from "./index.class";

import AdvisorAvailability from "../advisor_availability/index.type";

class StandardAdvisorAvailabilityCollectionFactory implements AdvisorAvailabilityCollectionFactory
{
  public construct(
    advisorAvailability : AdvisorAvailability[]
  ) : AdvisorAvailabilityCollection
  {
    return new StandardAdvisorAvailabilityCollection(
      advisorAvailability
    );
  }
}

export default StandardAdvisorAvailabilityCollectionFactory;
