import DataSource from "./index.type";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailability                  from "../advisor_availability/index.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorAvailabilityCollection        from "../advisor_availability_collection/index.type";
import AdvisorBookingCollectionFactory      from "../advisor_booking_collection/factory.type";
import AdvisorBookingCollection             from "../advisor_booking_collection/index.type";
import AvailabilityFactory                  from "../availability/factory.type";
import Availability                         from "../availability/index.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";
import HttpClient                           from "../http_client/index.type";

class StandardDataSource implements DataSource
{
  public constructor(
    private advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    private advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    private advisorBookingCollectionFactory       : AdvisorBookingCollectionFactory,
    private availabilityCollectionFactory         : AvailabilityCollectionFactory,
    private availabilityFactory                   : AvailabilityFactory,
    private availabilityUri                       : string,
    private httpClient                            : HttpClient
  ) {

  }

  public getAllAdvisorAvailability() : Promise<AdvisorAvailabilityCollection>
  {
    return this.httpClient.get(
      this.availabilityUri
    ).then(
      (
        response
      ) => {
        if (!response.isOk()) {
          throw new Error("Unable to get advisor availability: API responded with an error.");
        }

        const availabilities  = new Map<number, Availability[]>();

        Object.entries<{
          [dateTime : string] : number
        }>(
          JSON.parse(
            response.getBody()
          )
        ).forEach(
          (
            [
              ,
              advisorTimes
            ]
          ) => {
            Object.entries(
              advisorTimes
            ).forEach(
              ([
                dateTime,
                advisorId
              ]) => {
                let advisorAvailabilities = availabilities.get(advisorId);

                if (!advisorAvailabilities) {
                  advisorAvailabilities = [];

                  availabilities.set(
                    advisorId,
                    advisorAvailabilities
                  );
                }

                advisorAvailabilities.push(
                  this.availabilityFactory.construct(
                    new Date(dateTime)
                  )
                );
              }
            );
          }
        );

        const newAdvisorAvailabilities  : AdvisorAvailability[] = [];

        availabilities.forEach(
          (
            availability,
            advisorId
          ) => {
            newAdvisorAvailabilities.push(
              this.advisorAvailabilityFactory.construct(
                advisorId,
                this.availabilityCollectionFactory.construct(
                  availability
                )
              )
            );
          }
        );

        return this.advisorAvailabilityCollectionFactory.construct(
          newAdvisorAvailabilities
        );
      }
    );
  }

  public getAllBookings()  : Promise<AdvisorBookingCollection> {
    return Promise.resolve(
      this.advisorBookingCollectionFactory.construct([])
    );
  }
}

export default StandardDataSource;
