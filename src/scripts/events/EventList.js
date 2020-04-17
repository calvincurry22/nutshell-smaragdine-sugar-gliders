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

        let filteredEventsArray = events.filter(e => e.user === currentUserId)
        friendsCollection.filter(f => f.userId === currentUserId).map(uf => {
            events.filter(e => e.user === uf.friendUserId).forEach(fe => {
                filteredEventsArray.push(fe)
            })
        })

        const eventHTML = filteredEventsArray.map(event => {
            let isAFriendClass = false
            friends.map(friend => {
                if (friend.id === event.user) {
                    isAFriendClass = true
                }
            })
            const userWhoWroteEvent = usersCollection.find(user => user.id === event.user)
            return EventHTML(event, isAFriendClass, userWhoWroteEvent, currentUserId)
        }).join("")
        contentTarget.innerHTML = `
        <div class="events__titleContainer">
            <button id="addEvent">+Add Event</button>
            <div class="event__title">Events</div>
        </div>
        <div id="eventsCardsContainer">
            ${eventHTML}
        </div>
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