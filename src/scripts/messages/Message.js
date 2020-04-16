// Jon Durr - html rep. of single message
const eventHub = document.querySelector("#container")

export const Message = (message, messagesUser, currentUserId) => {
    return `
    <div class="messagesContainer__Message"><a id="chatName--${messagesUser.id}">${messagesUser.username}</a>: ${message.messageText}</div>
    ${message.userId === currentUserId ? `<button id="deleteMessageBtn--${message.id}">x</button>`:""}
    `
}





eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("chatName--")) {
        const [prefix, chatUser] = clickEvent.target.id.split("--")
        const chatNameClickEvent = new CustomEvent("chatNameClicked", {
            detail: {
                chatUserId: chatUser
            }
        })
        eventHub.dispatchEvent(chatNameClickEvent)
    }
})
