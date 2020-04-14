/* This file was written by Parker. This file creates the HTML for the form and handles the saving of the new event*/

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
                <input type="date" id="eventDate" name="eventDate">
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