import AdvisorAvailabilityRepository from "./index.type";

import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

interface AdvisorAvailabilityRepositoryFactory
{
  construct(
    allAdvisorAvailability  : AdvisorAvailabilityCollection
  ) : AdvisorAvailabilityRepository;
}

export default AdvisorAvailabilityRepositoryFactory;
