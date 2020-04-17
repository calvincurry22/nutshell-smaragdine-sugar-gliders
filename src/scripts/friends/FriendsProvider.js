//Author: Calvin Curry 
//This module is responsible for providing the friend user data. 

import { dispatchStateChangeEvent } from "../AppController.js"


const eventHub = document.querySelector("#container")

let friends = []

export const getFriends = () => {
    return fetch("http://localhost:8088/friends")
    .then(res => res.json())
    .then(parsedFriends => friends = parsedFriends)
}


export const useFriends = () => friends.slice()



export const saveFriends = (newFriendObj) => {
    fetch("http://localhost:8088/friends", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFriendObj)
    })
    .then(getFriends)
    .then(dispatchStateChangeEvent)
}


export const deleteFriend = (friendId) => {
    return fetch(`http://localhost:8088/friends/${friendId}`, {
        method: "DELETE"
    })
        .then(getFriends)
        .then(dispatchStateChangeEvent)
}