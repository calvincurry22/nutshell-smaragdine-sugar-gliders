// Jon Durr - messages/chat rendering component

import { useMessages, getMessages, deleteMessage } from "./messageProvider.js"
import { NewMessageButton } from "./NewMessageButton.js"
import { Message } from "./Message.js"
import { useUsers, getUsers } from "../user/userProvider.js"

const eventHub = document.querySelector("#container")

eventHub.addEventListener("componentStateChanged", e => {
    renderMessages()
})

export const MessageList = () => {
    renderMessages()
}

const renderMessages = () => {
    const promise = Promise.all([
        getUsers(),
        getMessages()
    ])
    promise.then(() => {
        const contentTarget = document.querySelector(".messagesContainer")
        const messages = useMessages()
        const users = useUsers()
        const sortedMessages = messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))

        const messageListHTML = sortedMessages.map(message => {
            const messagesUser = users.find(user => {
                return user.id === message.userId
            })
            
            return Message(message, messagesUser)
        }).join("")
        contentTarget.innerHTML = `
        <header>Chat History</header>
        ${messageListHTML}
        <div class="messagesHTML">
            <input type="text" id="messageText" name="message" onfocus="this.value=''" placeholder="Enter message here">
            ${NewMessageButton()}
        </div>
        `
    })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteMessageBtn--")) {
        const [prefix, messageId] = clickEvent.target.id.split("--")
        deleteMessage(messageId)
    }
})

