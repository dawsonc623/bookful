import StandardAvailability from "./index.class";
import Availability         from "./index.type";

describe("Availability", () => {
  let date  : Date;

  let availability  : Availability;

  beforeAll(() => {
    date  = new Date();

    availability  = new StandardAvailability(
      date
    );
  });

  test("returns expected date when requested", () => {
    expect(availability.getDate()).toBe(date);
  });
});
