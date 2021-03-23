import Responder from "../responder/index.type";

import AdvisorAvailabilityRepository from "../advisor_availability_repository/index.type";

interface GetAllAdvisorAvailabilityFactory
{
  construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository
  ) : Responder;
}

export default GetAllAdvisorAvailabilityFactory;
