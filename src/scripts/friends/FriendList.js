import { getFriends, useFriends } from "./FriendsProvider.js"
import { useUsers, getUsers } from "../user/userProvider.js"
import { Friend } from "./Friend.js"
import { FriendDialogButton } from "./FriendDialogButton.js"
import { deleteFriend } from "./FriendsProvider.js"



const contentTarget = document.querySelector(".friendsContainer")
const eventHub = document.querySelector("#container")

const render = () => {
    const promise = Promise.all([
        getUsers(),
        getFriends()
    ])
    promise.then(() => {
        const friendsCollection = useFriends()
        const currentUserId = parseInt(sessionStorage.getItem('userId'))
        const usersCollection = useUsers()

        const filteredFriends = friendsCollection.filter(friendObj => friendObj.userId === currentUserId)

        const friends = filteredFriends.map(friend => {
            return usersCollection.find(user => user.id === friend.friendUserId)
        })

        contentTarget.innerHTML = `
        ${Friend(friends)}
        ${FriendDialogButton()}`

    })
}


export const FriendList = () => {
    render()
}

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("removeFriendBtn--")) {
        const friendsArray = useFriends()
        const [prefix, friendId] = clickEvent.target.id.split("--")

        const foundFriend = friendsArray.find(friend => friend.friendUserId === parseInt(friendId))
        const foundFriendId = foundFriend.id
        deleteFriend(foundFriendId)
    }
})

eventHub.addEventListener("componentStateChanged", e => {
    FriendList()
})