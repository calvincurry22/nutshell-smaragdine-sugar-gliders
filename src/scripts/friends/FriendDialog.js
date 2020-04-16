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
        const allthefriends = useFriends()
        const currentUserId = parseInt(sessionStorage.getItem('userId'))
        const filteredArrayofUsers = allTheUsers.filter(user => {
            return allthefriends.find(friend => friend.friendUserId !== user.id)
        })
        
        contentTarget.innerHTML =`
            <dialog class="dialog" id="addFriendForm">
                <fieldset>
                    <div id="selectFriendContainer">
                        <select class="dropdown" id="friendDropdown">
                        <option value="0">Select a user</option>
                        ${
                            filteredArrayofUsers.map(singleUser => {
                                if(singleUser.id === currentUserId) {
                                    return false
                                } else {
                                    return `<option value="${singleUser.id}" class="selectOption">${singleUser.username}</option>`
                                }
                            }).join("")
                        }
                        </select>
                    </div>
                    <div ="saveFriendButtonContainer">    
                        ${AddFriendButton()}
                        ${CloseFriendButton()}
                    </div>
                </fieldset>
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
    getUsers()
        .then(getFriends)
        .then(() => {
        AddFriendForm()
        const dialogElement = document.querySelector("#addFriendForm")
        dialogElement.showModal()
    })
})

eventHub.addEventListener("closeFriendButtonClicked", customEvent => {
    const dialogElement = document.querySelector("#addFriendForm");
    dialogElement.close();
})