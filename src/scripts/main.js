import { getEvents } from "./events/eventsProvider.js";
import { EventsList } from "./events/EventList.js";

getEvents().then(EventsList)