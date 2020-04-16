// Jon Durr - html rep. of single message

export const Message = (message, messagesUser, currentUserId) => {
    return `
    <div class="messages__message  ">
        <div class="messages__message__container ${message.userId === currentUserId ? 'left':'right'}">
            <div><span class="message__user">${messagesUser.username}</span>: ${message.messageText}</div>
            ${message.userId === currentUserId ? `<button id="deleteMessageBtn--${message.id}">x</button>`:""}
        </div>
    </div>
    `
}