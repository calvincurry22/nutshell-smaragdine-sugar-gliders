/*
* Author: Michael Carroll
* This module holds an HTML representation of the registration button. The function, SignUpButton,
* is exported to RegisterDialog.js where it is invoked.
*/

export const SignUpButton = () => {
    return`
    <button id="signUpButton">Sign Up</button>
    `
}

const contentTarget = document.querySelector(".dialogContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
   if (clickEvent.target.id === "signUpButton") {
       const customEvent = new CustomEvent("signUpButtonClicked")

       eventHub.dispatchEvent(customEvent)
   }
})