import mitt from "mitt";
import type { EventsMap } from "./types";

const emitter = mitt<EventsMap>();

export default emitter;
