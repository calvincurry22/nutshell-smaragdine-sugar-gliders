/* This file was written by Parker. This file handles the data for the the events*/
const eventHub = document.querySelector('#container')

let events = []

const dispatchStateChangeEvent = () => {
    const eventStateChangedEvent = new CustomEvent("eventStateChanged")

    eventHub.dispatchEvent(eventStateChangedEvent)
}

export const getEvents = () => {
    return fetch('http://localhost:8088/events')
    .then(resp => resp.json())
    .then(parsed => {
        events = parsed
    })
}

export const useEvents = () => events.slice()

export const saveNote = note => {
    fetch('http://localhost:8088/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getEvents)
    .then(dispatchStateChangeEvent)
}

export const deleteEvent = id => {
    return fetch(`http://localhost:8080/events/${id}`, {
        method: "DELETE",
    })
    .then(getEvents)
    .then(dispatchStateChangeEvent)
}