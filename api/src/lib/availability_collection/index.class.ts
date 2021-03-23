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

  public removeDate(
    date  : Date
  ) : boolean {
    let found = false;

    const availabilityIndex = this.availabilities.findIndex(
      (
        advisorAvailability
      ) => {
        return advisorAvailability.getDate().getTime() === date.getTime();
      }
    );

    if (availabilityIndex > -1) {
      found = true;

      this.availabilities.splice(
        availabilityIndex,
        1
      );
    }

    return found;
  }
}

export default StandardAvailabilityCollection;
