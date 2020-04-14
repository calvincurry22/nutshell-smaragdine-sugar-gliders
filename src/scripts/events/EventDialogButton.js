import { EventForm } from "./EventForm.js"

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