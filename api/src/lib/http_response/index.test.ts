import StandardHttpResponse from "./index.class";
import HttpResponse         from "./index.type";

describe("HttpResponse", () => {
  let httpResponse : HttpResponse;

  beforeAll(() => {
    httpResponse  = new StandardHttpResponse(
      "hello",
      true
    );
  });

  test("returns expected body when requested", () => {
    expect(httpResponse.getBody()).toBe("hello");
  });

  test("returns expected 'ok' status when requested", () => {
    expect(httpResponse.isOk()).toBe(true);
  });
});
