/*
* Author: Michael Carroll
* This module holds an HTML representation of the login button. The function, LoginButton,
* is exported to SignInList.js where it is invoked.
*/

export const LoginButton = () => {
     return`
     <button id="loginButton">Login</button>
     `
}

const contentTarget = document.querySelector(".loginContainer");
const eventHub = document.querySelector("#container");

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        const customEvent = new CustomEvent("loginButtonClicked")

        eventHub.dispatchEvent(customEvent)

    }
})