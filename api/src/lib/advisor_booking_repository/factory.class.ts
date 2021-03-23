import AdvisorBookingRepository         from "./index.type";
import AdvisorBookingRepositoryFactory  from "./factory.type";
import StandardAdvisorBookingRepository from "./index.class";

import AdvisorBookingFactory  from "../advisor_booking/factory.type";
import DataSource             from "../data_source/index.type";

class StandardAdvisorBookingRepositoryFactory implements AdvisorBookingRepositoryFactory
{
  public construct(
    advisorBookingFactory : AdvisorBookingFactory,
    dataSource            : DataSource
  ) : AdvisorBookingRepository
  {
    return new StandardAdvisorBookingRepository(
      advisorBookingFactory,
      dataSource
    );
  }
}

export default StandardAdvisorBookingRepositoryFactory;
