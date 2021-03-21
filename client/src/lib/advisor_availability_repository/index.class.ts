import AdvisorAvailabilityRepository from "./index.type";

import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

class StandardAdvisorAvailabilityRepository implements AdvisorAvailabilityRepository
{
  public constructor(
    private allAdvisorAvailability  : AdvisorAvailabilityCollection
  ) {

  }

  public getAllAdvisorAvailability()  : AdvisorAvailabilityCollection {
    return this.allAdvisorAvailability;
  }
}

export default StandardAdvisorAvailabilityRepository;
