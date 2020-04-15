/*
* Author: Michael Carroll
* This module is responsible for rendering the sign in form and corresponding buttons to the DOM
* on initial page load. The function, SignInList, is exported to AppController.js and invoked there.
*/

import { SignInForm } from "./SignInForm.js";

const contentTarget = document.querySelector(".loginContainer");

export const SignInList = () => {
    contentTarget.innerHTML = SignInForm();
}