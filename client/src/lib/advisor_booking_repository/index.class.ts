import AdvisorBookingRepository from "./index.type";

import {
  AdvisorBookingResponse
} from "@bookful/data";

import AdvisorBookingFactory            from "../advisor_booking/factory.type";
import AdvisorBookingCollectionFactory  from "../advisor_booking_collection/factory.type";
import AdvisorBookingCollection         from "../advisor_booking_collection/index.type";

class StandardAdvisorBookingRepository implements AdvisorBookingRepository
{
  public constructor(
    private advisorBookingCollectionFactory : AdvisorBookingCollectionFactory,
    private advisorBookingFactory           : AdvisorBookingFactory,
    private apiOrigin                       : string
  ) {

  }

  public getAllAdvisorBookings() : Promise<AdvisorBookingCollection> {
    return window.fetch(
      `${this.apiOrigin}advisor/booking`
    ).then(
      (
        response
      ) => {
        return response.json();
      }
    ).then(
      (
        advisorBookingResponse  : AdvisorBookingResponse
      ) => {
        return this.advisorBookingCollectionFactory.construct(
          advisorBookingResponse.bookings.map(
            (
              advisorBookingData
            ) => {
              return this.advisorBookingFactory.construct(
                advisorBookingData.advisorId,
                new Date(advisorBookingData.date),
                advisorBookingData.studentName
              );
            }
          )
        );
      }
    );
  }
}

export default StandardAdvisorBookingRepository;
