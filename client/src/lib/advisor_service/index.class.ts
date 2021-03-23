import AdvisorService from "./index.type";

import {
  AdvisorAvailabilityResponse
} from "@bookful/data";

import AdvisorAvailabilityFactory           from "../advisor_availability/factory.type";
import AdvisorAvailabilityCollectionFactory from "../advisor_availability_collection/factory.type";
import AdvisorAvailabilityRepositoryFactory from "../advisor_availability_repository/factory.type";
import AdvisorAvailabilityRepository        from "../advisor_availability_repository/index.type";
import AdvisorBookingRepository             from "../advisor_booking_repository/index.type";
import AdvisorBookingCollection             from "../advisor_booking_collection/index.type";
import AvailabilityFactory                  from "../availability/factory.type";
import AvailabilityCollectionFactory        from "../availability_collection/factory.type";

class StandardAdvisorService implements AdvisorService
{
  public constructor(
    private advisorAvailabilityCollectionFactory  : AdvisorAvailabilityCollectionFactory,
    private advisorAvailabilityFactory            : AdvisorAvailabilityFactory,
    private advisorAvailabilityRepositoryFactory  : AdvisorAvailabilityRepositoryFactory,
    private advisorBookingRepository              : AdvisorBookingRepository,
    private apiOrigin                             : string,
    private availabilityCollectionFactory         : AvailabilityCollectionFactory,
    private availabilityFactory                   : AvailabilityFactory
  ) {

  }

  public getAllAdvisorBookings() : Promise<AdvisorBookingCollection> {
    return this.advisorBookingRepository.getAllAdvisorBookings();
  }

  public async getAvailabilityForAll() : Promise<AdvisorAvailabilityRepository> {
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
