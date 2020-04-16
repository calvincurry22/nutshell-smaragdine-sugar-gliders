/*
* Author: Michael Carroll
* This module holds an HTML representation of the sign in form. The function, SignInForm,
* is exported to SignInList.js where it is invoked.
*/

import { RegisterButton } from "./RegisterButton.js";
import { LoginButton } from "./LoginButton.js";

 export const SignInForm = () => {
     return`
     <fieldset id="loginForm">
        <div id="registerButtonContainer">
            ${RegisterButton()}
        </div>
        <div id="usernameContainer">
            <input type="text" id="loginUserName" onfocus="this.value=''" placeholder="username" required>
        </div>
        <div id="passwordContainer">
            <input type="password" id="loginPassword" onfocus="this.value=''" placeholder="password" required>
        </div>
        <div id="loginButtonContainer">
            ${LoginButton()}
        </div>
     </fieldset>
     `
 }

const eventHub = document.querySelector("#container");

eventHub.addEventListener("loginButtonClicked", customEvent => {
    const userName = document.querySelector("#loginUserName").value
    const password = document.querySelector("#loginPassword").value

    const customLoginEvent = new CustomEvent("loginValidation", {
        detail: {
            user: userName,
            validation: password,
        }
    })
    eventHub.dispatchEvent(customLoginEvent)
})

export const keypressListenerLogin = () => {
    const contentTarget = document.querySelector("#loginPassword");
    contentTarget.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            const userName = document.querySelector("#loginUserName").value
            const password = document.querySelector("#loginPassword").value
            
            const customLoginEvent = new CustomEvent("loginValidation", {
                detail: {
                    user: userName,
                    validation: password,
                }
            })
            eventHub.dispatchEvent(customLoginEvent)
        }
    })
}