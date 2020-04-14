import { Task } from "./tasks/TaskButton.js";
import {TaskList} from "./tasks/TaskList.js";
import { getTasks } from "./tasks/TaskProvider.js";

Task()
getTasks().then(TaskList)