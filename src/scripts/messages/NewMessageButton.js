import { saveMessages } from "./messageProvider.js"

// Jon Durr - html rep. of New Message Button plus relevent events to add message to databse
const eventHub = document.querySelector("#container")

export const NewMessageButton = () => {
    return `
    <button id="newMessageButton">New Message</button>
    `
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "newMessageButton") {
        // const userId = parseInt(sessionStorage.getItem(currentUserId))
        const messageText = document.querySelector("#messageText").value
        const timestamp = Date.now()

        const newMessage = {
            userId: 1,
            messageText: messageText,
            timestamp: timestamp
        }
        saveMessages(newMessage)
    }
})


