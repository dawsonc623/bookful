import Configuration from "./index.type";

interface ConfigurationFactory
{
  construct(
    availabilityUri : string
  ) : Configuration;
}

export default ConfigurationFactory;
