import AvailabilityCollection from "./index.type";

import Availability from "../availability/index.type";

class StandardAvailabilityCollection implements AvailabilityCollection
{
  public constructor(
    private availabilities  : Availability[]
  ) {

  }

  public getCount()  : number {
    return this.availabilities.length;
  }

  public map<T>(
    mapper  : (
      availability  : Availability
    ) => T
  ) : T[] {
    return this.availabilities.map(
      mapper
    );
  }
}

export default StandardAvailabilityCollection;
