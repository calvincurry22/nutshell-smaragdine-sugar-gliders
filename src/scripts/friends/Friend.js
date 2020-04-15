
export const Friend = (friendArray) => {
    return `
        ${friendArray.map(friend => {
            return `
                <section class="friend__Card">
                    <h4 class="friendName">${friend.username}</h4>
                    <button id="removeFriend--${friend.id}">Remove Friend</button>
                </section>
            `
        }).join("")}
    `
}