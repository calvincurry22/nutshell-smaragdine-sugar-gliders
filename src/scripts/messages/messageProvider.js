// Jon Durr - messages provider returning array of all messages

import { dispatchStateChangeEvent } from "../AppController.js"

let messages = []

export const getMessages = () => {
    return fetch('http://localhost:8088/messages')
        .then(response => response.json())
        .then(parsedmessages => {
            messages = parsedmessages
        })
}
export const useMessages = () => messages.slice()

export const saveMessages = message => {
    return fetch('http://localhost:8088/messages', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(getMessages)
    .then(dispatchStateChangeEvent)
}