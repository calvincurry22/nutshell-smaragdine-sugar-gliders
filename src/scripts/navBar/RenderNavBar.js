import { LogoutButton } from "./LogoutButton.js"

const navBarTarget = document.querySelector(".navBar")

export const RenderNavBar = () => {
    navBarTarget.innerHTML = `
    ${LogoutButton()}
    `
}

