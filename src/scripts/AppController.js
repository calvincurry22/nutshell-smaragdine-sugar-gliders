// Jon Durr - app controller component that will control the current page state of the app,
// check if users are logged in or not

import { Dashboard } from "./Dashboard.js"
import { keypressListenerLogin } from "./login/SignInForm.js"

const eventHub = document.querySelector("#container")

export const dispatchStateChangeEvent = () => {
    const componentStateChangedEvent = new CustomEvent("componentStateChanged")

    eventHub.dispatchEvent(componentStateChangedEvent)
}


let pageState = "login"

// function to render dashboard if someone is logged in
export const UserCheck = () => {
    if (sessionStorage.getItem('userId') === null) {
        pageState = "login"
        pageStateChanged()
        keypressListenerLogin()
    } else {
        Dashboard()
        pageState = "dashboard"
        pageStateChanged()
    }
}

eventHub.addEventListener("userWasVerified", event => {
    pageState = "dashboard"
    pageStateChanged()
})

eventHub.addEventListener("logoutButtonClicked", event => {
    const contentTarget = document.querySelector('.logoutButtonContainer')
    contentTarget.innerHTML = ''
    pageState = "login"
    pageStateChanged()
})

// whenever page state changed hide all components first with this function
const hideAllComponents = () => {
    const componentArray = [
        '.loginContainer',
        '.dashboardContainer',
        '.navBar'
    ]
    componentArray.forEach(component => document.querySelector(component).classList.add("hidden"))
}

export const pageStateChanged = () => {
    //add the "hidden" class to all components to reset the app state before running the logic
    hideAllComponents()

    if (pageState === "login") {
        document.querySelector(".loginContainer").classList.remove("hidden")
    } else if (pageState === "dashboard") {
        document.querySelector(".dashboardContainer").classList.remove("hidden")
        document.querySelector(".navBar").classList.remove("hidden")
    }
}