// Jon Durr - html rep. of single message

export const Message = (message, messagesUser) => {
    return `
    <div class="messagesContainer__Message">${messagesUser.username}: ${message.messageText}</div>
    <button id="deleteMessageBtn--${message.id}">x</button>
    `
}