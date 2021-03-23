import AdvisorAvailability from "../advisor_availability/index.type";

interface AdvisorAvailabilityCollection
{
  map<T>(
    mapper  : (
      advisorAvailability : AdvisorAvailability
    ) => T
  ) : T[];

  removeAvailability(
    advisorId : number,
    date      : Date
  ) : boolean;
}

export default AdvisorAvailabilityCollection;
