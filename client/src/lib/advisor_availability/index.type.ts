import AvailabilityCollection from "../availability_collection/index.type";

interface AdvisorAvailability
{
  getAdvisorId()  : number;

  getAllAvailability()  : AvailabilityCollection;
}

export default AdvisorAvailability;
