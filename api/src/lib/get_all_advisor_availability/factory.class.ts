import Responder                        from "../responder/index.type";
import GetAllAdvisorAvailabilityFactory from "./factory.type";
import GetAllAdvisorAvailability        from "./index.class";

import AdvisorAvailabilityRepository from "../advisor_availability_repository/index.type";

class StandardGetAllAdvisorAvailabilityFactory implements GetAllAdvisorAvailabilityFactory
{
  public construct(
    advisorAvailabilityRepository : AdvisorAvailabilityRepository
  ) : Responder
  {
    return new GetAllAdvisorAvailability(
      advisorAvailabilityRepository
    );
  }
}

export default StandardGetAllAdvisorAvailabilityFactory;
