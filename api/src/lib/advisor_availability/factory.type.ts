import AdvisorAvailability from "./index.type";

import AvailabilityCollection from "../availability_collection/index.type";

interface AdvisorAvailabilityFactory
{
  construct(
    advisorId       : number,
    availabilities  : AvailabilityCollection
  ) : AdvisorAvailability;
}

export default AdvisorAvailabilityFactory;
