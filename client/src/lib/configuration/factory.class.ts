import Configuration         from "./index.type";
import ConfigurationFactory  from "./factory.type";
import StandardConfiguration from "./index.class";

class StandardConfigurationFactory implements ConfigurationFactory
{
  public construct(
    apiOrigin : string
  ) : Configuration
  {
    return new StandardConfiguration(
      apiOrigin
    );
  }
}

export default StandardConfigurationFactory;
