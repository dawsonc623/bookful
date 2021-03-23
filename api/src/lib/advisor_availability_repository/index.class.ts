import AdvisorAvailabilityRepository from "./index.type";

import AdvisorAvailabilityCollection  from "../advisor_availability_collection/index.type";
import DataSource                     from "../data_source/index.type";

class StandardAdvisorAvailabilityRepository implements AdvisorAvailabilityRepository
{
  private advisorAvailability : Promise<AdvisorAvailabilityCollection> | null = null;

  public constructor(
    private dataSource  : DataSource
  ) {

  }

  public getAllAdvisorAvailability()  : Promise<AdvisorAvailabilityCollection> {
    if (!this.advisorAvailability) {
      this.advisorAvailability = this.dataSource.getAllAdvisorAvailability();
    }

    return this.advisorAvailability;
  }
}

export default StandardAdvisorAvailabilityRepository;
