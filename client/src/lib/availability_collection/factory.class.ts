import AvailabilityCollection         from "./index.type";
import AvailabilityCollectionFactory  from "./factory.type";
import StandardAvailabilityCollection from "./index.class";

import Availability from "../availability/index.type";

class StandardAvailabilityCollectionFactory implements AvailabilityCollectionFactory
{
  public construct(
    availabilities  : Availability[]
  ) : AvailabilityCollection
  {
    return new StandardAvailabilityCollection(
      availabilities
    );
  }
}

export default StandardAvailabilityCollectionFactory;
