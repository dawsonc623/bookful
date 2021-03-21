import AdvisorAvailabilityRepository from "../advisor_availability_repository/index.type";

interface AdvisorService
{
  getAvailabilityForAll() : Promise<AdvisorAvailabilityRepository>;
}

export default AdvisorService;
