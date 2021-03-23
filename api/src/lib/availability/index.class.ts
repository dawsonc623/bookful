import Availability from "./index.type";

class StandardAvailability implements Availability
{
  public constructor(
    private date  : Date
  ) {

  }

  public getDate() : Date {
    return this.date;
  }
}

export default StandardAvailability;
