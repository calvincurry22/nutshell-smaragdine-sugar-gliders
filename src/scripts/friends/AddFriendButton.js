/*
* Author: Michael Carroll
* This module holds an HTML representation of a button. The function, AddFriendButton,
* is exported to FriendDialog.js where it is invoked.
*/

export const AddFriendButton = () => {
    return`
    <button id="addFriendButton">Add Friend</button>
    `
}

const contentTarget = document.querySelector(".dialogContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
   if (clickEvent.target.id === "addFriendButton") {
       const customEvent = new CustomEvent("addFriendButtonClicked")

       eventHub.dispatchEvent(customEvent)
   }
})