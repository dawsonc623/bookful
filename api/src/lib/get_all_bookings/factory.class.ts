import Responder             from "../responder/index.type";
import GetAllBookingsFactory from "./factory.type";
import GetAllBookings        from "./index.class";

class StandardGetAllBookingsFactory implements GetAllBookingsFactory
{
  public construct() : Responder
  {
    return new GetAllBookings();
  }
}

export default StandardGetAllBookingsFactory;
