import { saveEvent } from "./eventsProvider.js"

const contentTarget = document.querySelector('.eventsContainer')

const render = () => {
    return `
        <form class="eventForm">
            <fieldset>
                <label for="eventTitle">Event: </label>
                <input type="text" id="eventTitle" name="eventTitle">
            </fieldset>
            <fieldset>
                <label for="eventDate">Date: </label>
                <input type="text" id="eventDate" name="eventDate">
            </fieldset>
            <fieldset>
                <label for="eventLocation">Location: </label>
                <input type="text" id="eventLocation" name="eventLocation">
            </fieldset>

            <button id="saveEvent">Save Event</button>
        </form>
    `
}


export const EventForm = () => {
    return render()
}

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveEvent") {

        const eventTitle = document.querySelector("#eventTitle").value
        const date = document.querySelector("#eventLocation").value
        const location = document.querySelector("#eventLocation").value

        // Make a new object representation of a note
        const newEvent = {
            userId: 1,//????
            event: eventTitle,
            date: date,
            location: location
        }

        // Change API state and application state
        saveEvent(newEvent)
    }
})