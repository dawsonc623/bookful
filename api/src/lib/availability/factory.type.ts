import Availability from "./index.type";

interface AvailabilityFactory
{
  construct(
    date  : Date
  ) : Availability;
}

export default AvailabilityFactory;
