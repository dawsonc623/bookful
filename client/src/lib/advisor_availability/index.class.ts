import AdvisorAvailability from "./index.type";

import AvailabilityCollection from "../availability_collection/index.type";

class StandardAdvisorAvailability implements AdvisorAvailability
{
  public constructor(
    public advisorId       : number,
    public availabilities  : AvailabilityCollection
  ) {

  }

  public getAdvisorId()  : number {
    return this.advisorId;
  }

  public getAllAvailability()  : AvailabilityCollection {
    return this.availabilities;
  }
}

export default StandardAdvisorAvailability;
