import HttpClient from "./index.type";

import fetch from "node-fetch";

import HttpResponseFactory  from "../http_response/factory.type";
import HttpResponse         from "../http_response/index.type";

class StandardHttpClient implements HttpClient
{
  public constructor(
    private httpResponseFactory : HttpResponseFactory
  ) {

  }

  public get(
    url : string
  ) : Promise<HttpResponse> {
    let ok  = false;

    return fetch(
      url
    ).then(
      (
        response
      ) => {
        ok  = response.ok;

        return response.text();
      }
    ).then(
      (
        body
      ) => {
        return this.httpResponseFactory.construct(
          body,
          ok
        );
      }
    );
  }
}

export default StandardHttpClient;
