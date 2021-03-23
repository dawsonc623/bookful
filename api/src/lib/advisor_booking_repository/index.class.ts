import AdvisorBookingRepository from "./index.type";

import AdvisorBookingFactory    from "../advisor_booking/factory.type";
import AdvisorBookingCollection from "../advisor_booking_collection/index.type";
import DataSource               from "../data_source/index.type";

class StandardAdvisorBookingRepository implements AdvisorBookingRepository
{
  private bookings  : Promise<AdvisorBookingCollection> | null = null;

  public constructor(
    private advisorBookingFactory : AdvisorBookingFactory,
    private dataSource            : DataSource
  ) {

  }

  public async addBooking(
    advisorId   : number,
    date        : Date,
    studentName : string
  ) : Promise<void> {
    if (!this.bookings) {
      this.bookings = this.dataSource.getAllBookings();
    }

    const bookings = await this.bookings;

    bookings.add(
      this.advisorBookingFactory.construct(
        advisorId,
        date,
        studentName
      )
    );
  }

  public getAllBookings()  : Promise<AdvisorBookingCollection> {
    if (!this.bookings) {
      this.bookings = this.dataSource.getAllBookings();
    }

    return this.bookings;
  }
}

export default StandardAdvisorBookingRepository;
