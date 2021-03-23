import HttpClient         from "./index.type";
import HttpClientFactory  from "./factory.type";
import StandardHttpClient from "./index.class";

import HttpResponseFactory  from "../http_response/factory.type";

class StandardHttpClientFactory implements HttpClientFactory
{
  public construct(
    httpResponseFactory : HttpResponseFactory
  ) : HttpClient
  {
    return new StandardHttpClient(
      httpResponseFactory
    );
  }
}

export default StandardHttpClientFactory;
