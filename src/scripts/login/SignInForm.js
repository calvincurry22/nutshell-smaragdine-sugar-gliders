/*
* Author: Michael Carroll
* This module holds an HTML representation of the sign in form. The function, SignInForm,
* is exported to SignInList.js where it is invoked.
*/
 export const SignInForm = () => {
     return`
     <fieldset id="loginForm">
        <div id="registerButtonContainer"></div>
        <div id="usernameContainer">
            <label class="label label--login" for="loginUserName">Username:</label>
            <input type="text" id="loginUserName" onfocus="this.value=''" required>
        </div>
        <div id="passwordContainer">
            <label class="label label--login" for="loginPassword">Password:</label>
            <input type="text" id="loginPassword" onfocus="this.value=''" required>
        </div>
        <div id="loginButtonContainer"></div>
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