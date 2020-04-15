const eventHub = document.querySelector("#container")

export const LogoutButton = () => {
    return `
    <button id="logoutButton">Logout</button>
    `
}



eventHub.addEventListener("click", event => {
    if (event.target.id === "logoutButton") {
        sessionStorage.clear()
        const logoutEvent = new CustomEvent("logoutButtonClicked")
        eventHub.dispatchEvent(logoutEvent)
    }
})