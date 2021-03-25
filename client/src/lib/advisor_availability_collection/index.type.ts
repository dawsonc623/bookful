import AdvisorAvailability from "../advisor_availability/index.type";

interface AdvisorAvailabilityCollection
{
  getCount()  : number;

  map<T>(
    mapper  : (
      advisorAvailability : AdvisorAvailability
    ) => T
  ) : T[];
}

export default AdvisorAvailabilityCollection;
