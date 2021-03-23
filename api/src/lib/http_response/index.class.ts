import HttpResponse from "./index.type";

class StandardHttpResponse implements HttpResponse
{
  public constructor(
    private body  : string,
    private ok    : boolean
  ) {

  }

  public getBody() : string {
    return this.body;
  }

  public isOk() : boolean {
    return this.ok;
  }
}

export default StandardHttpResponse;
