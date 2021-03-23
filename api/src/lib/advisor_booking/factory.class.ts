import AdvisorBooking         from "./index.type";
import AdvisorBookingFactory  from "./factory.type";
import StandardAdvisorBooking from "./index.class";

class StandardAdvisorBookingFactory implements AdvisorBookingFactory
{
  public construct(
    advisorId   : number,
    date        : Date,
    studentName : string
  ) : AdvisorBooking
  {
    return new StandardAdvisorBooking(
      advisorId,
      date,
      studentName
    );
  }
}

export default StandardAdvisorBookingFactory;
