import Availability from "../availability/index.type";

interface AvailabilityCollection
{
  getCount()  : number;

  map<T>(
    mapper  : (
      availability  : Availability
    ) => T
  ) : T[];

  removeDate(
    date  : Date
  ) : boolean;
}

export default AvailabilityCollection;
