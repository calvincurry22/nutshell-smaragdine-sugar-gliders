import { useEvents } from "./eventsProvider.js"
import { EventHTML } from "./Event.js"

const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.eventsContainer')

const render = () => {
    const events = useEvents()

    const eventHTML = events.map(event => EventHTML(event)).join()
    return eventHTML
}

export const EventsList = () => {
    contentTarget.innerHTML = render()
}