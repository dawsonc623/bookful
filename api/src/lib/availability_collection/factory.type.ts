import AvailabilityCollection from "./index.type";

import Availability from "../availability/index.type";

interface AvailabilityCollectionFactory
{
  construct(
    availabilities  : Availability[]
  ) : AvailabilityCollection;
}

export default AvailabilityCollectionFactory;
