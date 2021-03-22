import AdvisorService         from "./index.type";
import AdvisorServiceFactory  from "./factory.type";
import StandardAdvisorService from "./index.class";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorAvailabilityRepositoryFactory from "../advisor_availability_repository/factory.type";
import AdvisorBookingFactory                from "../advisor_booking/factory.type";
import AdvisorBookingCollectionFactory      from "../advisor_booking_collection/factory.type";
import AdvisorBookingRepositoryFactory      from "../advisor_booking_repository/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorServiceFactory implements AdvisorServiceFactory
{
  public construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    advisorAvailabilityRepositoryFactory  : AdvisorAvailabilityRepositoryFactory,
    advisorBookingCollectionFactory       : AdvisorBookingCollectionFactory,
    advisorBookingFactory                 : AdvisorBookingFactory,
    advisorBookingRepositoryFactory       : AdvisorBookingRepositoryFactory,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory
  ) : AdvisorService
  {
    return new StandardAdvisorService(
      advisorAvailabilityCollectionFactory,
      advisorAvailabilityFactory,
      advisorAvailabilityRepositoryFactory,
      advisorBookingCollectionFactory,
      advisorBookingFactory,
      advisorBookingRepositoryFactory,
      availabilityCollectionFactory,
      availabilityFactory
    );
  }
}

export default StandardAdvisorServiceFactory;
