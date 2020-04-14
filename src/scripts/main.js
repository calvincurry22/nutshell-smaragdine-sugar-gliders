import { getArticles } from "./articles/ArticlesProvider.js";
import { ArticleList } from "./articles/ArticleList.js";
import { ArticleDialogButton } from "./articles/ArticleDialogButton.js";
import "./articles/ArticleDialog.js"
import { MessageList } from "./messages/MessageList.js";
import { getEvents } from "./events/eventsProvider.js";
import { EventsList } from "./events/EventList.js";
import "./events/EventDialogButton.js"

getEvents().then(EventsList)
MessageList()

getArticles()
.then(ArticleList)
.then(ArticleDialogButton)
