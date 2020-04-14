import { getEvents } from "./events/eventsProvider.js";
import { EventsList } from "./events/EventList.js";
import "./events/EventDialogButton.js"
import "./events/EventForm.js"

getEvents().then(EventsList)