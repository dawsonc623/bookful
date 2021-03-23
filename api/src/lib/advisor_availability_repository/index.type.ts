import AdvisorAvailabilityCollection from "../advisor_availability_collection/index.type";

interface AdvisorAvailabilityRepository
{
  getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection>;

  removeAvailability(
    advisorId : number,
    date      : Date
  ) : Promise<boolean>;
}

export default AdvisorAvailabilityRepository;
