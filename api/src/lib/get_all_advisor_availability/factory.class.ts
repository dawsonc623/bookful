import Responder                        from "../responder/index.type";
import GetAllAdvisorAvailabilityFactory from "./factory.type";
import GetAllAdvisorAvailability        from "./index.class";

class StandardGetAllAdvisorAvailabilityFactory implements GetAllAdvisorAvailabilityFactory
{
  public construct() : Responder
  {
    return new GetAllAdvisorAvailability();
  }
}

export default StandardGetAllAdvisorAvailabilityFactory;
