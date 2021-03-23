import HttpResponse         from "./index.type";
import HttpResponseFactory  from "./factory.type";
import StandardHttpResponse from "./index.class";

class StandardHttpResponseFactory implements HttpResponseFactory
{
  public construct(
    body  : string,
    ok    : boolean
  ) : HttpResponse
  {
    return new StandardHttpResponse(
      body,
      ok
    );
  }
}

export default StandardHttpResponseFactory;
