import DateFormatter         from "./index.type";
import DateFormatterFactory  from "./factory.type";
import StandardDateFormatter from "./index.class";

class StandardDateFormatterFactory implements DateFormatterFactory
{
  public construct() : DateFormatter
  {
    return new StandardDateFormatter();
  }
}

export default StandardDateFormatterFactory;
