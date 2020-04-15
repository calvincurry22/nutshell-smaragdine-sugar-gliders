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
            <fieldset>
                <div id="closeButtonContainer">
                    ${CloseDialog()}
                </div>
                <form>
                    <label class="label label--registration" for="registerEmail">Enter Email:</label>
                    <input type="email" id="registerEmail" required /></br>

                    <label class="label label--registration" for="registerUserName">Enter Desired User Name:</label>
                    <input type="text" id="registerUserName" required /></br>

                    <label class="label label--registration" for="registerPassword">Enter Password:</label>
                    <input type="password" id="registerPassword" required /></br>

                    <label class="label label--registration" for="registerPasswordConfirmation">Re-Enter Password:</label>
                    <input type="password" id="registerPasswordConfirmation" required /></br>
                </form>
                <div id="signUpButtonContainer">
                    ${SignUpButton()}
                </div>
            </fieldset>
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
    
})

eventHub.addEventListener("closeButtonClicked", customEvent => {
    const dialog = document.querySelector("#registrationForm");
    dialog.close();
})
