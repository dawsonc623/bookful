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
    private advisorBookingFactory           : AdvisorBookingFactory
  ) {

  }

  public getAllAdvisorBookings() : Promise<AdvisorBookingCollection> {
    return Promise.resolve(
      {
        "bookings"  : [
          {
            "advisorId"   : 3456,
            "date"        : "2021-03-22T11:00:00.000Z",
            "studentName" : "John Smith"
          }
        ]
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
