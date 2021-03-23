import configurationFactory from "./factory";

const configuration  = configurationFactory.construct(
  "https://www.thinkful.com/api/advisors/availability"
);

export default configuration;
