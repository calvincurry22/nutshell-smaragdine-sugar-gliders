/*
* Author: Michael Carroll
* This module holds an HTML representation of a close button for a dialog box.
* CloseDialog is exported to RegisterDialog.js and invoked there.   
*/

export const CloseDialog = () => {
    const buttonContentTarget = document.querySelector("#closeButtonContainer")

    buttonContentTarget.innerHTML = `
    <button id="closeDialogButton">Close</button>
    `
}

const contentTarget = document.querySelector(".dialogContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
   if (clickEvent.target.id === "closeDialogButton") {
       const customEvent = new CustomEvent("closeButtonClicked")

       eventHub.dispatchEvent(customEvent)
   }
})