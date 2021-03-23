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

  public addBooking(
    advisorId   : number,
    date        : Date,
    studentName : string
  )  : Promise<void> {
    return window.fetch(
      `${this.apiOrigin}advisor/booking`,
      {
        "headers" : new Headers({
          "Content-Type": "application/json"
        }),
        "method"  : "POST",

        "body"    : JSON.stringify({
          advisorId,
          studentName,

          "date"  : date.toISOString()
        })
      }
    ).then(
      (
        response
      ) => {
        if (!response.ok) {
          throw new Error("Could not add new booking.");
        }
      }
    );
  }

  public getAllAdvisorBookings() : Promise<AdvisorBookingCollection> {
    return window.fetch(
      `${this.apiOrigin}advisor/booking`
    ).then(
      (
        response
      ) => {
        if (!response.ok) {
          throw new Error("Could not get all bookings.");
        }

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
