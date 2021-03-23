import HttpResponse from "./index.type";

interface HttpResponseFactory
{
  construct(
    body  : string,
    ok    : boolean
  ) : HttpResponse;
}

export default HttpResponseFactory;
