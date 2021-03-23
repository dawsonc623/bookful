import configurationFactory from "./factory";

const configuration  = configurationFactory.construct(
  "http://localhost:3000/"
);

export default configuration;
