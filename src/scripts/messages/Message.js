// Jon Durr - html rep. of single message
const eventHub = document.querySelector("#container")

export const Message = (message, messagesUser, currentUserId) => {
    return `
    
    <div class="messages__message  ">
        <div class="messages__message__container ${message.userId === currentUserId ? 'right':'left'}">
            <div><span class="message__user" id="chatName--${messagesUser.id}">${messagesUser.username}</span>: ${message.messageText}</div>
            ${message.userId === currentUserId ? `<button id="deleteMessageBtn--${message.id}">x</button>`:""}
        </div>
    </div>
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
