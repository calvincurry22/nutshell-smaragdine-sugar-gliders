import { Task } from "./tasks/TaskButton.js";
import {TaskList} from "./tasks/TaskList.js";
import { getTasks } from "./tasks/TaskProvider.js";
import { MessageList } from "./messages/MessageList.js";
import { getEvents } from "./events/eventsProvider.js";
import { EventsList } from "./events/EventList.js";
import "./events/EventDialogButton.js"

Task()
getTasks().then(TaskList)
getEvents().then(EventsList)
MessageList()
