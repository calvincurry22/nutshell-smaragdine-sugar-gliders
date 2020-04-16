/*
* Author: Michael Carroll
* This module holds an HTML representation of a button. The function, CloseFriendButton,
* is exported to FriendDialog.js where it is invoked.
*/

export const CloseFriendButton = () => {
    return`
    <button id="closeFriendButton">Close</button>
    `
}

const contentTarget = document.querySelector(".dialogContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
   if (clickEvent.target.id === "closeFriendButton") {
       const customEvent = new CustomEvent("closeFriendButtonClicked")

       eventHub.dispatchEvent(customEvent)
   }
})