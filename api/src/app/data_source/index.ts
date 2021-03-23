import dataSourceFactory from "./factory";

import advisorAvailabilityFactory           from "../advisor_availability/factory";
import advisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory";
import advisorBookingCollectionFactory      from "../advisor_booking_collection/factory";
import availabilityFactory                  from "../availability/factory";
import availabilityCollectionFactory        from "../availability_collection/factory";
import configuration                        from "../configuration";
import httpClient                           from "../http_client";

const dataSource  = dataSourceFactory.construct(
  advisorAvailabilityCollectionFactory,
  advisorAvailabilityFactory,
  advisorBookingCollectionFactory,
  availabilityCollectionFactory,
  availabilityFactory,
  configuration.getAvailabilityUri(),
  httpClient
);

export default dataSource;
