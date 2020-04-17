/* This file was written by Parker. This file creates the HTML for the form and handles the saving of the new event*/

const contentTarget = document.querySelector('.eventsContainer')

const render = () => {
    return `
        <form class="eventForm">
            <input type="text" id="eventTitle" name="eventTitle" onfocus="this.value=''" placeholder="Event" />
            <input type="date" id="eventDate" name="eventDate">
            <input type="text" id="eventLocation" name="eventLocation"  onfocus="this.value=''" placeholder="Location" />
        </form>
        <button id="saveEvent">Save Event</button>
    `
}


export const EventForm = () => {
    return render()
}