import AdvisorAvailability from "../advisor_availability/index.type";
import AdvisorAvailabilityCollection from "./index.type";

class StandardAdvisorAvailabilityCollection implements AdvisorAvailabilityCollection
{
  public constructor(
    private advisorAvailabilities : AdvisorAvailability[]
  ) {

  }

  public map<T>(
    mapper  : (
      advisorAvailability : AdvisorAvailability
    ) => T
  ) : T[] {
    return this.advisorAvailabilities.map(
      mapper
    );
  }
}

export default StandardAdvisorAvailabilityCollection;
