export const EventHTML = (event) => {
    return `
    <div class="event">
        <div class="event__title">${event.event}</div>
        <div class="event__detail">${event.date}</div>
        <div class="event__detail">${event.location}</div>
    </div>
    `
}