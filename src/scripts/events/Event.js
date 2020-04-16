/* This file was written by Parker. This file converts an event object into an HTML representation*/

export const EventHTML = (event, isAFriendClass, userWhoWroteEvent, currentUserId) => {
    return `
    <div class="event ${isAFriendClass === true ? 'italicized' : ''}">
        <div class="eventTitleDeleteButtonWrapper">
            <div class="event__title">${event.event}</div>
            ${event.user === currentUserId ? `<button id="deleteEventBtn--${event.id}">x</button>`:""}
        </div>
        <div class="textImageWrapper">
            <div class="event__text">
                <div class="event__detail">${event.date}</div>
                <div class="event__detail">${event.location}</div>
                <div class="event__detail">posted by: ${userWhoWroteEvent.username}</div>
            </div>
            <div class="event_imageContainer">
                <img class="event__image" src="../../styles/images/calendar.svg">
            </div>
        </div>
    </div>
    `
}