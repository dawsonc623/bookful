import advisorAvailabilityRepositoryFactory from "./factory";

import advisorAvailabilityFactory           from "../advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory";
import availabilityFactory                  from "../availability/factory";
import availabilityCollectionFactory        from "../availability_collection/factory";
import configuration                        from "../configuration";

const advisorAvailabilityRepository  = advisorAvailabilityRepositoryFactory.construct(
  advisorAvailabilityCollectionFactory,
  advisorAvailabilityFactory,
  configuration.getApiOrigin(),
  availabilityCollectionFactory,
  availabilityFactory
);

export default advisorAvailabilityRepository;
