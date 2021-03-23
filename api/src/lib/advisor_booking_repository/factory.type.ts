import AdvisorBookingRepository from "./index.type";

import DataSource from "../data_source/index.type";

interface AdvisorBookingRepositoryFactory
{
  construct(
    dataSource  : DataSource
  ) : AdvisorBookingRepository;
}

export default AdvisorBookingRepositoryFactory;
