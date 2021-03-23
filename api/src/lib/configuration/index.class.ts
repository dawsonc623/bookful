import Configuration from "./index.type";

class StandardConfiguration implements Configuration
{
  public constructor(
    private availabilityUri : string
  ) {

  }

  public getAvailabilityUri() : string {
    return this.availabilityUri;
  }
}

export default StandardConfiguration;
