/* This file was written by Parker. This file renders the list of Events to the DOM*/

import { useEvents, deleteEvent, getEvents } from "./eventsProvider.js"
import { EventHTML } from "./Event.js"

const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.eventsContainer')

// here
const render = () => {
    getEvents().then(() => {
        const events = useEvents()

        const eventHTML = events.map(event => EventHTML(event)).join("")
        contentTarget.innerHTML = `
        ${eventHTML}
        <button id="addEvent">Add Event</button>
        `
    })
}

export const EventsList = () => {
    render()
}
// to here

contentTarget.addEventListener("click", event => {
    if(event.target.id === "addEvent") {
        const showEventForm = new CustomEvent ("addEventButtonClicked")
        eventHub.dispatchEvent(showEventForm)
    }
})

contentTarget.addEventListener("click", event => {
    if(event.target.id.includes("deleteEvent--")) {
        const eventToDelte = parseInt(event.target.id.split('--')[1])

        deleteEvent(eventToDelte)
    }
})

eventHub.addEventListener("componentStateChanged", event => {
    EventsList()
})