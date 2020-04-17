/*
* Author: Michael Carroll
* This module holds an HTML representation of a dialog element
* that allows a user to add a friend from the users resource.
*/

import { getUsers, useUsers } from "../user/userProvider.js"
import { AddFriendButton } from "./AddFriendButton.js"
import { CloseFriendButton } from "./CloseFriendsButton.js"
import { saveFriends, useFriends, getFriends } from "./FriendsProvider.js"


const eventHub = document.querySelector("#container");
const contentTarget = document.querySelector(".dialogContainer");

const AddFriendForm = () => {
    const allTheUsers = useUsers();
    const allThefriends = useFriends()
    const currentUserId = parseInt(sessionStorage.getItem('userId'))
    //users minus current user.
    const usersMinusCurrentUser = allTheUsers.filter(user => user.id !== currentUserId)
    //all the current users friend relationships.
    const currentUsersFriendRelationships = allThefriends.filter(friend => friend.userId === currentUserId)
    //declare a new array to hold the final product.
    let notFriendsArray = usersMinusCurrentUser;
    //iterate the current user's relationships.
    currentUsersFriendRelationships.map(cufr => {
        //find the user that matches the current relationship.
        let userObject = usersMinusCurrentUser.find(user => user.id === cufr.friendUserId)
        //find the index of that user object on the array of users.
        let indexNumber = usersMinusCurrentUser.indexOf(userObject)
        //remove that friend user from the array.
        notFriendsArray.splice(indexNumber, 1)
    })
        
        contentTarget.innerHTML =`
            <dialog class="dialog" id="addFriendForm">
                <div id="selectFriendContainer">
                    <select class="dropdown" id="friendDropdown">
                    <option value="0">Select a user</option>
                    ${
                        notFriendsArray.map(singleUser => {
                                return `<option value="${singleUser.id}" class="selectOption">${singleUser.username}</option>`
                        }).join("")
                    }
                    </select>
                </div>
                <div ="saveFriendButtonContainer">    
                    ${AddFriendButton()}
                    ${CloseFriendButton()}
                </div>
            </dialog>`
}

eventHub.addEventListener("addFriendButtonClicked", customEvent => {
    const selectElement = document.querySelector("#friendDropdown").value;

    if (selectElement !== "0") {
        const selectedFriendUserId = parseInt(document.querySelector("#friendDropdown").value);
        const currentUserId = parseInt(sessionStorage.getItem('userId'));
        
        let friendObject = {
            userId: currentUserId,
            friendUserId: selectedFriendUserId
        }
        saveFriends(friendObject);
        const dialogElement = document.querySelector("#addFriendForm")
        dialogElement.close()
    }
})

eventHub.addEventListener("findFriendBtnClicked", customEvent => {
    const promise = Promise.all([
        getUsers(),
        getFriends()
    ])
    promise.then(() => {
        AddFriendForm()
        const dialogElement = document.querySelector("#addFriendForm")
        dialogElement.showModal()
    })
})

eventHub.addEventListener("closeFriendButtonClicked", customEvent => {
    const dialogElement = document.querySelector("#addFriendForm");
    dialogElement.close();
})