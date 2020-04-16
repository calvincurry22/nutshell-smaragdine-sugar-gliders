/* This file was written by Parker. This file handles the populates the dialog container with the form to add a new event*/

import { EventForm } from "./EventForm.js"
import { saveEvent } from "./eventsProvider.js"

const contentTarget = document.querySelector('.dialogContainer')
const eventHub = document.querySelector('#container')



const eventDialog = () => {
    contentTarget.innerHTML = `
    <dialog class="eventDialog">
        ${EventForm()}
        <button id="closeDialog">Close</button>
    </dialog>
    `
}

eventHub.addEventListener("addEventButtonClicked", event => {
    eventDialog()

    const dialogElement = document.querySelector('.eventDialog')
    dialogElement.showModal()
})

contentTarget.addEventListener("click", event => {
    if(event.target.id === "closeDialog") {
        event.target.parentElement.close()
    }
})

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveEvent") {

        const eventTitle = document.querySelector("#eventTitle").value
        const date = document.querySelector("#eventDate").value
        const location = document.querySelector("#eventLocation").value
        const currentUserId = parseInt(sessionStorage.getItem("userId"))


        // Make a new object representation of a note
        const newEvent = {
            user: currentUserId,
            event: eventTitle,
            date: date,
            location: location
        }

        // Change API state and application state
        saveEvent(newEvent)

        const dialogElement = document.querySelector('.eventDialog')
        dialogElement.close()
    }
})