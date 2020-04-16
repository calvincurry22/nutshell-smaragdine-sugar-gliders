
const eventHub = document.querySelector("#container")

export const FriendDialogButton = () => {
    return `
        <button id="button--FindFriend">Find new Friend</button>
    `
}


eventHub.addEventListener('click', (clickEvent) => {

    if (clickEvent.target.id === "button--FindFriend") {
      const findFriendEvent = new CustomEvent('findFriendBtnClicked')
      eventHub.dispatchEvent(findFriendEvent)
    }

})