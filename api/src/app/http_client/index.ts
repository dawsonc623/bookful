import httpClientFactory from "./factory";

import httpResponseFactory from "../http_response/factory";

const httpClient  = httpClientFactory.construct(
  httpResponseFactory
);

export default httpClient;
