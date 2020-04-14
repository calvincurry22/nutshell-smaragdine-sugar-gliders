import { saveMessages } from "./messageProvider.js"

// Jon Durr - html rep. of New Message Button plus relevent events to add message to databse
const messageButtonTarget = document.querySelector("#newMessageButton")

export const NewMessageButton = () => {
    return `
    <button id="newMessageButton">New Message</button>
    `
}

messageButtonTarget.addEventListener("click", event => {
    const userId = parseInt(sessionStorage.getItem(currentUserId))
    const messageText = document.querySelector("#messageText").value
    const timestamp = Date.now()

    const newMessage = {
        userId: userId,
        messageText: messageText,
        timestamp: timestamp
    }
    saveMessages(newMessage)
})


