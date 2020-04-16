/*
* Author: Michael Carroll
* This module holds an HTML representation of a dialog element
* that allows a user to add a friend from the users resource.
*/

import { getUsers, useUsers } from "../user/userProvider.js"
import { AddFriendButton } from "./AddFriendButton.js"
import { saveFriends } from "./FriendsProvider.js"


const eventHub = document.querySelector("#container");
const contentTarget = document.querySelector(".dialogContainer");

const AddFriendForm = () => {
        const allTheUsers = useUsers();
        const currentUserId = parseInt(sessionStorage.getItem('userId'))
        const filteredArrayofUsers = allTheUsers.filter(user => user.id !== currentUserId)
        contentTarget.innerHTML =`
            <dialog class="dialog" id="addFriendForm">
                <fieldset>
                    <div id="selectFriendContainer">
                        <select class="dropdown" id="friendDropdown">
                        <option value="0">Select a user</option>
                        ${
                            filteredArrayofUsers.map(singleUser => {
                            return `<option value="${singleUser.id}" class="selectOption">${singleUser.username}</option>`
                            }).join("")
                        }
                        </select>
                    </div>
                    <div ="saveFriendButtonContainer">    
                        ${AddFriendButton()}          
                    </div>
                </fieldset>
            </dialog>`
}

eventHub.addEventListener("addFriendButtonClicked", customEvent => {
    const selectedFriendUserId = parseInt(document.querySelector("#friendDropdown").value);
    const currentUserId = parseInt(sessionStorage.getItem('userId'));
    
    let friendObject = {
        userId: currentUserId,
        friendUserId: selectedFriendUserId
    }
    saveFriends(friendObject);
    const dialogElement = document.querySelector("#addFriendForm")
    dialogElement.close()
})

eventHub.addEventListener("findFriendBtnClicked", customEvent => {
    getUsers().then(() => {
        AddFriendForm()
        const dialogElement = document.querySelector("#addFriendForm")
        dialogElement.showModal()
    })
})