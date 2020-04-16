// Jon Durr - html rep. of single message

export const Message = (message, messagesUser, currentUserId) => {
    return `
    <div class="messagesContainer__Message">${messagesUser.username}: ${message.messageText}</div>
    ${message.userId === currentUserId ? `<button id="deleteMessageBtn--${message.id}">x</button>`:""}
    `
}