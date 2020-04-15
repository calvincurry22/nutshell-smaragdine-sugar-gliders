import { MessageList } from "./messages/MessageList.js"
import { EventsList } from "./events/EventList.js"
import { ArticleList } from "./articles/ArticleList.js"
import { RenderNavBar } from "./navBar/RenderNavBar.js"
import { TaskList } from "./tasks/TaskList.js"
import { FriendList } from "./friends/FriendList.js"

const eventHub = document.querySelector("#container")

export const Dashboard = () => {
    RenderNavBar()
    MessageList()
    EventsList()
    ArticleList()
    TaskList()
    FriendList()
}

eventHub.addEventListener("userWasVerified", event => {
    Dashboard()
})
