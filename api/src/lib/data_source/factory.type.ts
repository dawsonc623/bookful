import DataSource from "./index.type";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorBookingCollectionFactory      from "../advisor_booking_collection/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";
import HttpClient                           from "../http_client/index.type";

interface DataSourceFactory
{
  construct(
    advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    advisorBookingCollectionFactory       : AdvisorBookingCollectionFactory,
    availabilityCollectionFactory         : AvailabilityCollectionFactory,
    availabilityFactory                   : AvailabilityFactory,
    availabilityUri                       : string,
    httpClient                            : HttpClient
  ) : DataSource;
}

export default DataSourceFactory;
