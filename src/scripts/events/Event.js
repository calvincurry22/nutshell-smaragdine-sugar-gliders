/* This file was written by Parker. This file converts an event object into an HTML representation*/

export const EventHTML = (event, isAFriendClass, userWhoWroteEvent) => {
    return `
    <div class="event ${isAFriendClass === true ? 'italicized' : ''}">
        <div class="event__title">${event.event}</div>
        <div class="event__detail">${event.date}</div>
        <div class="event__detail">${event.location}</div>
        <div class="event__detail">posted by: ${userWhoWroteEvent.username}</div>
        <button id="deleteEvent--${event.id}">x</button>
    </div>
    `
}