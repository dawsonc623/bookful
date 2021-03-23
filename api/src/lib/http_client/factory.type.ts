import HttpClient from "./index.type";

import HttpResponseFactory  from "../http_response/factory.type";

interface HttpClientFactory
{
  construct(
    httpResponseFactory : HttpResponseFactory
  ) : HttpClient;
}

export default HttpClientFactory;
