import DateFormatter from "./index.type";

class StandardDateFormatter implements DateFormatter
{
  public humanReadable(
    date  : Date
  ) : string {
    const hours   = date.getHours();
    const minutes = date.getMinutes();

    const period  = hours > 11 ? "PM" : "AM";

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ` +
      `${(hours % 12 || 12)}:${minutes > 9 ? minutes : `0${minutes}`} ${period}`;
  }
}

export default StandardDateFormatter;
