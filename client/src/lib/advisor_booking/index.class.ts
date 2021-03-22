import AdvisorBooking from "./index.type";

class StandardAdvisorBooking implements AdvisorBooking
{
  public constructor(
    private advisorId   : number,
    private date        : Date,
    private studentName : string
  ) {

  }

  public getAdvisorId()  : number {
    return this.advisorId;
  }

  public getDate() : Date {
    return this.date;
  }

  public getStudentName()  : string {
    return this.studentName;
  }
}

export default StandardAdvisorBooking;
