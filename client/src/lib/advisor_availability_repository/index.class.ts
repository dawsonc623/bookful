import AdvisorAvailabilityRepository from "./index.type";

import {
  AdvisorAvailabilityResponse
} from "@bookful/data";

import AdvisorAvailabilityCollection        from "../advisor_availability_collection/index.type";
import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorAvailabilityRepository implements AdvisorAvailabilityRepository
{
  public constructor(
    private advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    private advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    private apiOrigin                             : string,
    private availabilityCollectionFactory         : AvailabilityCollectionFactory,
    private availabilityFactory                   : AvailabilityFactory
  ) {

  }

  public getAllAdvisorAvailability()  : Promise<AdvisorAvailabilityCollection> {
    return window.fetch(
      `${this.apiOrigin}advisor/availability`
    ).then(
      (
        response
      ) => {
        return response.json();
      }
    ).then(
      (
        advisorAvailabilityResponse : AdvisorAvailabilityResponse
      ) => {
        return this.advisorAvailabilityCollectionFactory.construct(
          advisorAvailabilityResponse.advisorAvailabilities.map(
            (
              advisoriAvailabilityData
            ) => {
              return this.advisorAvailabilityFactory.construct(
                advisoriAvailabilityData.advisorId,
                this.availabilityCollectionFactory.construct(
                  advisoriAvailabilityData.availabilities.map(
                    (
                      availability
                    ) => {
                      return this.availabilityFactory.construct(
                        new Date(availability.date)
                      );
                    }
                  )
                )
              );
            }
          )
        );
      }
    );
  }
}

export default StandardAdvisorAvailabilityRepository;
