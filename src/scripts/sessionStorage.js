/*
* Author: Michael Carroll
* This module's responsibility is to listen for the custom event, "loginButtonClicked",
* authenticate the user by searching the users resource in the database.json, and
* then set the sessionStorage for the current user for use throughout other modules.
*/

import { useUsers, getUsers } from "./user/userProvider.js";
import { Dashboard } from "./Dashboard.js";

const eventHub = document.querySelector("#container");

eventHub.addEventListener("loginValidation", customEvent => {
    getUsers().then(() => {
        const allTheUsers = useUsers();
        const password = customEvent.detail.validation;
        const userName = customEvent.detail.user;

        let user = allTheUsers.find(u => {
            return u.username === userName && u.password === password
        })
        if (user === undefined) {
            alert("Combination of username and password does not exist.")
        } else {
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("userName", user.username);
            // here
            const userVerifiedEvent = new CustomEvent("userWasVerified")
            eventHub.dispatchEvent(userVerifiedEvent)
            //to here
            alert( "Welcome, " + sessionStorage.getItem('userName'))
        }
    })
})