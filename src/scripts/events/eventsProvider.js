import { dispatchStateChangeEvent } from "../AppController.js"

/* This file was written by Parker. This file handles the data for the the events*/
const eventHub = document.querySelector('#container')

let events = []

export const getEvents = () => {
    return fetch('http://localhost:8088/events')
    .then(resp => resp.json())
    .then(parsed => {
        events = parsed
    })
}

export const useEvents = () => events.slice()

export const saveEvent = event => {
    return fetch('http://localhost:8088/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    .then(getEvents)
    .then(dispatchStateChangeEvent)
}

export const deleteEvent = id => {
    return fetch(`http://localhost:8088/events/${id}`, {
        method: "DELETE",
    })
    .then(getEvents)
    .then(dispatchStateChangeEvent)
}