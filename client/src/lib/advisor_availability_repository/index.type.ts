import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

interface AdvisorAvailabilityRepository
{
  getAllAdvisorAvailability()  : AdvisorAvailabilityCollection;
}

export default AdvisorAvailabilityRepository;
