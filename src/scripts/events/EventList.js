/* This file was written by Parker. This file renders the list of Events to the DOM*/

import { useEvents, deleteEvent, getEvents } from "./eventsProvider.js"
import { EventHTML } from "./Event.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"
import { useUsers, getUsers } from "../user/userProvider.js"

const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.eventsContainer')

// here
const render = () => {
    const promise = Promise.all([
        getUsers(),
        getEvents(),
        getFriends()
    ])
    promise.then(() => {
        const events = useEvents()
        const usersCollection = useUsers()
        const friendsCollection = useFriends()
        const currentUserId = parseInt(sessionStorage.getItem("userId"))

        const filteredFriends = friendsCollection.filter(friendObj => friendObj.userId === currentUserId)
        const friends = filteredFriends.map(friend => {
            return usersCollection.find(user => user.id === friend.friendUserId)
        })

        const eventHTML = events.map(event => {
            let isAFriendClass = false
            friends.map(friend => {
                if (friend.id === event.user) {
                    isAFriendClass = true
                }
            })
            const userWhoWroteEvent = usersCollection.find(user => user.id === event.user)
            return EventHTML(event, isAFriendClass, userWhoWroteEvent)
        }).join("")
        contentTarget.innerHTML = `
        ${eventHTML}
        <button id="addEvent">Add Event</button>
        `
    })
}

export const EventsList = () => {
    render()
}
// to here

contentTarget.addEventListener("click", event => {
    if(event.target.id === "addEvent") {
        const showEventForm = new CustomEvent ("addEventButtonClicked")
        eventHub.dispatchEvent(showEventForm)
    }
})

contentTarget.addEventListener("click", event => {
    if(event.target.id.includes("deleteEvent--")) {
        const eventToDelte = parseInt(event.target.id.split('--')[1])

        deleteEvent(eventToDelte)
    }
})

eventHub.addEventListener("componentStateChanged", event => {
    EventsList()
})