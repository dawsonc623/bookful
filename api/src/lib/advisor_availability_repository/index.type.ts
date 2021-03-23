import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

interface AdvisorAvailabilityRepository
{
  getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection>;
}

export default AdvisorAvailabilityRepository;
