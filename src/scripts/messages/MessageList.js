// Jon Durr - messages/chat rendering component

import { useMessages } from "./messageProvider.js"
import { NewMessageButton } from "./NewMessageButton.js"
import { Message } from "./Message.js"

const eventHub = document.querySelector("#container")
const messagesContainerTarget = document.querySelector(".messagesContainer")

eventHub.addEventListener("componentStateChanged", event => {
    renderMessages()
})

export const MessageList = () => {
    messagesContainerTarget.innerHTML = `
    <header class="messagesContainer__Header">Chat</header>
    <section class="messagesContainer__Messages"></section>
    <input type="text" id="messageText" name="message" onfocus="this.value=''" placeholder="Enter message here">
    ${NewMessageButton()}
    `
}

const renderMessages = () => {
    const contentTarget = document.querySelector(".messagesContainer__Messages")
    const messages = useMessages()
    // const users = useUsers()
    // const userId = parseInt(sessionStorage.getItem(currentUserId))
    // const currentUser = users.find(user.id === userId)
    const currentUser = {
        id: 1,
        username: "jondurr",
        email: "durrjp1@gmail.com",
        password: "1234"
    }

    const sortedMessages = messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
    contentTarget.innerHTML = sortedMessages.map(message => Message(message, currentUser)).join("")

}

eventHub.addEventListener("loginButtonClicked", event => {
    renderMessages()
})