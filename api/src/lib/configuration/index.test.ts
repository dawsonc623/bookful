import StandardConfiguration  from "./index.class";
import Configuration          from "./index.type";

describe("Configuration", () => {
  let configuration : Configuration;

  beforeAll(() => {
    configuration = new StandardConfiguration(
      "http://my.availability.net/"
    );
  });

  test("returns expected availability URI when requested", () => {
    expect(
      configuration.getAvailabilityUri()
    ).toBe(
      "http://my.availability.net/"
    );
  });
});