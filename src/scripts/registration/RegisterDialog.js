/*
* Author: Michael Carroll
* This module holds an HTML representation of a registration form in a dialog box.
*/

import { addUser } from "../user/userProvider.js";
import { SignUpButton } from "./SignUpButton.js";
import { CloseDialog } from "./CloseDialogButton.js";

const eventHub = document.querySelector("#container");
const contentTarget = document.querySelector(".dialogContainer");

export const RegisterForm = () => {
    contentTarget.innerHTML =`
        <dialog class="dialog" id="registrationForm">
            <div id="closeDialogButtonContainer">
                ${CloseDialog()}
            </div>
            <form>
                <input type="email" id="registerEmail" onfocus="this.value=''" placeholder="Email" required /></br>

                <input type="text" id="registerUserName" onfocus="this.value=''" placeholder="Desired User Name" required /></br>

                <input type="password" id="registerPassword" onfocus="this.value=''" placeholder="Enter Password" required /></br>

                <input type="password" id="registerPasswordConfirmation" onfocus="this.value=''" placeholder="Re-Enter Password" required /></br>
            </form>
            <div id="signUpButtonContainer">
                ${SignUpButton()}
            </div>
        </dialog>
        `
}

eventHub.addEventListener("signUpButtonClicked", customEvent => {
    const password = document.querySelector("#registerPassword").value
    const passwordConfirmation = document.querySelector("#registerPasswordConfirmation").value
    if ( password === passwordConfirmation && password !== "") {
        const userName = document.querySelector("#registerUserName").value;
        const email = document.querySelector("#registerEmail").value;

        const validationFuntion = () => {
            const customLoginEvent = new CustomEvent("loginValidation", {
                detail: {
                    user: userName,
                    validation: password,
                }
            })
            eventHub.dispatchEvent(customLoginEvent)
        }

        const newUser = {
            "username": userName,
            "email": email,
            "password": password
        }
        addUser(newUser)
            .then(validationFuntion)

            
        const dialog = document.querySelector("#registrationForm");
        dialog.close();
    } else if (password !== passwordConfirmation) {
        alert("Re-entered password does not match initial password.")
    } else {
        alert("Please fill out required fields")
    }
})

eventHub.addEventListener("registerButtonClicked", customEvent => {
    RegisterForm();
    const dialog = document.querySelector("#registrationForm");
    dialog.showModal();
    registrationKeypressListener()
    
})

eventHub.addEventListener("closeButtonClicked", customEvent => {
    const dialog = document.querySelector("#registrationForm");
    dialog.close();
})

const registrationKeypressListener = () => {
    const contentTarget = document.querySelector("#registrationForm");
    contentTarget.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            const password = document.querySelector("#registerPassword").value
            const passwordConfirmation = document.querySelector("#registerPasswordConfirmation").value
            if ( password === passwordConfirmation && password !== "") {
                const userName = document.querySelector("#registerUserName").value;
                const email = document.querySelector("#registerEmail").value;

                const validationFuntion = () => {
                    const customLoginEvent = new CustomEvent("loginValidation", {
                        detail: {
                            user: userName,
                            validation: password,
                        }
                    })
                    eventHub.dispatchEvent(customLoginEvent)
                }

                const newUser = {
                    "username": userName,
                    "email": email,
                    "password": password
                }
                addUser(newUser)
                    .then(validationFuntion)

                    
                const dialog = document.querySelector("#registrationForm");
                dialog.close();
            } else if (password !== passwordConfirmation) {
                alert("Re-entered password does not match initial password.")
            } else {
                alert("Please fill out required fields")
            }
        }
    })
}