/*
* Author: Michael Carroll
* This module is responsible for rendering the sign in form and corresponding buttons to the DOM
* on initial page load. The function, SignInList, is exported to AppController.js and invoked there.
*/

import { SignInForm } from "./SignInForm.js";
import { RegisterButton } from "./RegisterButton.js";
import { LoginButton } from "./LoginButton.js";

const contentTarget = document.querySelector(".loginContainer");

export const SignInList = () => {
    contentTarget.innerHTML = SignInForm();
    const loginContentTarget = document.querySelector("#loginButtonContainer");
    const registerContentTarget = document.querySelector("#registerButtonContainer");

    registerContentTarget.innerHTML += RegisterButton();
    loginContentTarget.innerHTML += LoginButton();
}