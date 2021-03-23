interface HttpResponse
{
  getBody() : string;

  isOk() : boolean;
}

export default HttpResponse;
