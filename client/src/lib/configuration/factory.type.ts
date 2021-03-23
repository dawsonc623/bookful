import Configuration from "./index.type";

interface ConfigurationFactory
{
  construct(
    apiOrigin : string
  ) : Configuration;
}

export default ConfigurationFactory;
