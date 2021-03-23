import AdvisorBookingRepository         from "./index.type";
import AdvisorBookingRepositoryFactory  from "./factory.type";
import StandardAdvisorBookingRepository from "./index.class";

import DataSource from "../data_source/index.type";

class StandardAdvisorBookingRepositoryFactory implements AdvisorBookingRepositoryFactory
{
  public construct(
    dataSource  : DataSource
  ) : AdvisorBookingRepository
  {
    return new StandardAdvisorBookingRepository(
      dataSource
    );
  }
}

export default StandardAdvisorBookingRepositoryFactory;
