const eventHub = document.querySelector("#container")

eventHub.addEventListener("click", event => {
    if (event.target.id === "logoutButton") {
        sessionStorage.clear()
        const logoutEvent = new CustomEvent("logoutButtonClicked")
        eventHub.dispatchEvent(logoutEvent)
    }
})

export const renderLogout = () => {
    const contentTarget = document.querySelector('.logoutButtonContainer')

    contentTarget.innerHTML = `
        <button id="logoutButton">Logout</button>
    `
}