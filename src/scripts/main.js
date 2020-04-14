import { MessageList } from "./messages/MessageList.js";
import { getEvents } from "./events/eventsProvider.js";
import { EventsList } from "./events/EventList.js";
import "./events/EventDialogButton.js"

getEvents().then(EventsList)
MessageList()
