import AdvisorBookingRepository from "./index.type";

import AdvisorBookingFactory  from "../advisor_booking/factory.type";
import DataSource             from "../data_source/index.type";

interface AdvisorBookingRepositoryFactory
{
  construct(
    advisorBookingFactory : AdvisorBookingFactory,
    dataSource            : DataSource
  ) : AdvisorBookingRepository;
}

export default AdvisorBookingRepositoryFactory;
