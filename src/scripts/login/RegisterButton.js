/*
* Author: Michael Carroll
* This module holds an HTML representation of the register button. The function, RegisterButton,
* is exported to SignInList.js where it is invoked.
*/

export const RegisterButton = () => {
    return`
    <button id="registerButton">Register</button>
    `
}

const contentTarget = document.querySelector(".loginContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
   if (clickEvent.target.id === "registerButton") {
       const customEvent = new CustomEvent("registerButtonClicked")

       eventHub.dispatchEvent(customEvent)
   }
})