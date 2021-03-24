import StandardAdvisorAvailability  from "./index.class";
import AdvisorAvailability          from "./index.type";

import AvailabilityCollection from "../availability_collection/index.type";

import availabilityFactory            from "../../app/availability/factory";
import availabilityCollectionFactory  from "../../app/availability_collection/factory";

describe("AdvisorAvailability", () => {
  let advisorAvailability : AdvisorAvailability;

  let advisorId       : number;
  let availabilities  : AvailabilityCollection;

  beforeAll(() => {
    advisorId = 123;

    availabilities = availabilityCollectionFactory.construct([
      availabilityFactory.construct(new Date())
    ]);

    advisorAvailability = new StandardAdvisorAvailability(
      advisorId,
      availabilities
    );
  });

  test("returns expected advisor ID when requested", () => {
    expect(advisorAvailability.getAdvisorId()).toBe(advisorId);
  });

  test("returns expected availabilities when requested", () => {
    expect(advisorAvailability.getAllAvailability()).toBe(availabilities);
  });
});
