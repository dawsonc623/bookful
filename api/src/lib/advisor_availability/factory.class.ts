import AdvisorAvailability         from "./index.type";
import AdvisorAvailabilityFactory  from "./factory.type";
import StandardAdvisorAvailability from "./index.class";

import AvailabilityCollection from "../availability_collection/index.type";

class StandardAdvisorAvailabilityFactory implements AdvisorAvailabilityFactory
{
  public construct(
    advisorId       : number,
    availabilities  : AvailabilityCollection
  ) : AdvisorAvailability
  {
    return new StandardAdvisorAvailability(
      advisorId,
      availabilities
    );
  }
}

export default StandardAdvisorAvailabilityFactory;
