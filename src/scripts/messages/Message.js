// Jon Durr - html rep. of single message

export const Message = (message, user) => {
    return `
    <div class="messagesContainer__Message">${user.username}: ${message.messageText}</div>
    `
}