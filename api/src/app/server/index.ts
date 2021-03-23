import bodyParser from "body-parser";
import cors       from "cors";

import express, {
  RequestHandler
} from "express";

import Responder from "../../lib/responder/index.type";

import addBooking                 from "../add_booking";
import getAllAdvisorAvailability  from "../get_all_advisor_availability";
import getAllBookings             from "../get_all_bookings";

const server = express();

server.use(cors());
server.use(bodyParser.json());

function createHandlerFromResponder(
  responder : Responder
) : RequestHandler {
  return responder.respond.bind(responder);
}

server.get(
  "/advisor/availability",
  createHandlerFromResponder(
    getAllAdvisorAvailability
  )
);

server.get(
  "/advisor/booking",
  createHandlerFromResponder(
    getAllBookings
  )
);

server.post(
  "/advisor/booking",
  createHandlerFromResponder(
    addBooking
  )
);

export default server;
