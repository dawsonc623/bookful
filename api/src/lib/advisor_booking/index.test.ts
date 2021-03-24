import StandardAdvisorBooking from "./index.class";
import AdvisorBooking         from "./index.type";

describe("AdvisorBooking", () => {
  let advisorId   : number;
  let date        : Date;
  let studentName : string;

  let advisorBooking : AdvisorBooking;

  beforeAll(() => {
    advisorId   = 123;
    date        = new Date();
    studentName = "Phil";

    advisorBooking  = new StandardAdvisorBooking(
      advisorId,
      date,
      studentName
    );
  });

  test("returns expected advisor ID when requested", () => {
    expect(advisorBooking.getAdvisorId()).toBe(advisorId);
  });

  test("returns expected date when requested", () => {
    expect(advisorBooking.getDate()).toBe(date);
  });

  test("returns expected student name when requested", () => {
    expect(advisorBooking.getStudentName()).toBe(studentName);
  });
});
