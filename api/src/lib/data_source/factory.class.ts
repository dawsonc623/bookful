import DataSource         from "./index.type";
import DataSourceFactory  from "./factory.type";
import StandardDataSource from "./index.class";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorBookingCollectionFactory      from "../advisor_booking_collection/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";
import HttpClient                           from "../http_client/index.type";

class StandardDataSourceFactory implements DataSourceFactory
{
  public construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    advisorBookingCollectionFactory       : AdvisorBookingCollectionFactory,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory,
    availabilityUri                       : string,
    httpClient                            : HttpClient
  ) : DataSource
  {
    return new StandardDataSource(
      advisorAvailabilityCollectionFactory,
      advisorAvailabilityFactory,
      advisorBookingCollectionFactory,
      availabilityCollectionFactory,
      availabilityFactory,
      availabilityUri,
      httpClient
    );
  }
}

export default StandardDataSourceFactory;
