import Configuration         from "./index.type";
import ConfigurationFactory  from "./factory.type";
import StandardConfiguration from "./index.class";

class StandardConfigurationFactory implements ConfigurationFactory
{
  public construct(
    availabilityUri : string
  ) : Configuration
  {
    return new StandardConfiguration(
      availabilityUri
    );
  }
}

export default StandardConfigurationFactory;
