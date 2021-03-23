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

  public removeAvailability(
    advisorId : number,
    date      : Date
  ) : boolean {
    let found = false;

    const advisorAvailabilityIndex = this.advisorAvailabilities.findIndex(
      (
        advisorAvailability
      ) => {
        return advisorAvailability.getAdvisorId() === advisorId;
      }
    );

    if (advisorAvailabilityIndex > -1) {
      const allAvailability = this.advisorAvailabilities[advisorAvailabilityIndex].getAllAvailability();

      found = allAvailability.removeDate(
        date
      );

      if (allAvailability.getCount() === 0) {
        this.advisorAvailabilities.splice(
          advisorAvailabilityIndex,
          1
        );
      }
    }

    return found;
  }
}

export default StandardAdvisorAvailabilityCollection;
