import bodyParser from "body-parser";
import cors       from "cors";
import express    from "express";

import getAllAdvisorAvailability  from "../get_all_advisor_availability";
import getAllBookings             from "../get_all_bookings";

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get(
  "/advisor/availability",
  getAllAdvisorAvailability.respond.bind(getAllAdvisorAvailability)
);

server.get(
  "/advisor/booking",
  getAllBookings.respond.bind(getAllBookings)
);

export default server;
