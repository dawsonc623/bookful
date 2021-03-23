import Configuration from "./index.type";

class StandardConfiguration implements Configuration
{
  public constructor(
    private apiOrigin : string
  ) {

  }

  public getApiOrigin() : string {
    return this.apiOrigin;
  }
}

export default StandardConfiguration;
