import HttpResponse from "../http_response/index.type";

interface HttpClient
{
  get(
    url : string
  ) : Promise<HttpResponse>;
}

export default HttpClient;
