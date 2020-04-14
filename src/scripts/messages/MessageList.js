// Jon Durr - messages/chat rendering component

import { useMessages } from "./messageProvider.js"
import { NewMessageButton } from "./NewMessageButton.js"
import { Message } from "./Message.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("componentStateChanged", {
    renderMessages()
})

export const MessageList = () => {
    return `
    <header class="messagesContainer__Header">Chat</header>
    <section class="messagesContainer__Messages"></section>
    <input type="text" id="messageText" name="message">
    ${NewMessageButton}
    `
}

const renderMessages = () => {
    const contentTarget = document.querySelector(".messagesContainer__Messages")
    const messages = useMessages()
    const users = useUsers()
    const userId = parseInt(sessionStorage.getItem(currentUserId))
    const currentUser = users.find(user.id === userId)


    contentTarget.innerHTML = messages.map(message => Message(message, currentUser))

}

eventHub.addEventListener("loginOrRegisterButtonClicked", event => {
    renderMessages()
})
