import { getFriends, useFriends, saveFriends } from "./FriendsProvider.js"
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
        <div class="friend__title">Friends</div>
        ${FriendDialogButton()}
        ${Friend(friends)}`

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


eventHub.addEventListener("chatNameClicked", customEvent => {
    const promise = Promise.all([
        getUsers(),
        getFriends()
    ])
    promise.then( () => {
        const usersArray = useUsers()
        const friendsArray = useFriends()
        const currentUser = parseInt(sessionStorage.getItem('userId'))
        const foundUser = usersArray.find(user => user.id === parseInt(customEvent.detail.chatUserId))
        const test = friendsArray.find(friend => friend.friendUserId === foundUser.id)
        const userCheck = () => {
            if(test) {
                alert("User is already a Friend")
            } else if(foundUser.id === currentUser) {
                return false
            }
            else {
                const confirmation = confirm(`Add ${foundUser.username} as a friend? Click OK to confirm`)
                            if(confirmation) {
                                let newFriendObject = {
                                    userId: currentUser,
                                    friendUserId: foundUser.id
                                }
                                saveFriends(newFriendObject)
                            }
            }
        }
        userCheck()
    })
})