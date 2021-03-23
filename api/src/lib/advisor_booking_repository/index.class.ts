import AdvisorBookingRepository from "./index.type";

import AdvisorBookingCollection from "../advisor_booking_collection/index.type";
import DataSource               from "../data_source/index.type";

class StandardAdvisorBookingRepository implements AdvisorBookingRepository
{
  private bookings  : Promise<AdvisorBookingCollection> | null = null;

  public constructor(
    private dataSource  : DataSource
  ) {

  }

  public getAllBookings()  : Promise<AdvisorBookingCollection> {
    if (!this.bookings) {
      this.bookings = this.dataSource.getAllBookings();
    }

    return this.bookings;
  }
}

export default StandardAdvisorBookingRepository;
