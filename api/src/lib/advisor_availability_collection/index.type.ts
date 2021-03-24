import AdvisorAvailability from "../advisor_availability/index.type";

interface AdvisorAvailabilityCollection
{
  // TODO Test for these
  getCount()  : number;

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
