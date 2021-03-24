import {
  Request,
  Response
} from "express";

interface Responder
{
  respond(
    request   : Request,
    response  : Response
  ) : Promise<void>;
}

export default Responder;
