import getAllAdvisorAvailabilityFactory from "./factory";

import advisorAvailabilityRepository from "../advisor_availability_repository";

const getAllAdvisorAvailability  = getAllAdvisorAvailabilityFactory.construct(
  advisorAvailabilityRepository
);

export default getAllAdvisorAvailability;
