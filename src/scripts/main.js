import { MessageList } from "./messages/MessageList.js";
import "./AppController.js"
import "./messages/NewMessageButton.js"
import { getMessages } from "./messages/messageProvider.js";
getMessages()
.then(MessageList)