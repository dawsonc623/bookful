import AdvisorService from "./index.type";

import {
  AdvisorAvailabilityResponse
} from "@bookful/data";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorAvailabilityRepositoryFactory from "../advisor_availability_repository/factory.type";
import AdvisorAvailabilityRepository        from "../advisor_availability_repository/index.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorService implements AdvisorService
{
  public constructor(
    private advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    private advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    private advisorAvailabilityRepositoryFactory  : AdvisorAvailabilityRepositoryFactory,
    private availabilityCollectionFactory         : AvailabilityCollectionFactory,
    private availabilityFactory                   : AvailabilityFactory
  ) {

  }

  public async getAvailabilityForAll() : Promise<AdvisorAvailabilityRepository> {
    return Promise.resolve(
      {
        "advisorAvailabilities" : [
          {
            "advisorId" : 1234,
            "availabilities"  : [
              {
                "date"  : "2021-03-21T22:30:00.000Z"
              },
              {
                "date"  : "2021-03-22T14:00:00.000Z"
              }
            ]
          },
          {
            "advisorId" : 2345,
            "availabilities"  : [
              {
                "date"  : "2021-03-22T00:00:00.000Z"
              },
              {
                "date"  : "2021-04-22T18:30:00.000Z"
              }
            ]
          }
        ]
      }
    ).then(
      (
        advisorAvailabilityResponse : AdvisorAvailabilityResponse
      ) => {
        return this.advisorAvailabilityRepositoryFactory.construct(
          this.advisorAvailabilityCollectionFactory.construct(
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
          )
        );
      }
    );
  }
}

export default StandardAdvisorService;
