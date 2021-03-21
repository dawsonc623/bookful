import Availability         from "./index.type";
import AvailabilityFactory  from "./factory.type";
import StandardAvailability from "./index.class";

class StandardAvailabilityFactory implements AvailabilityFactory
{
  public construct(
    date  : Date
  ) : Availability
  {
    return new StandardAvailability(
      date
    );
  }
}

export default StandardAvailabilityFactory;
