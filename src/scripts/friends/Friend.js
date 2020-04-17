// Author: Calvin Curry 
//This module is resposible for providing the HTML representation of each friend object.



export const Friend = (friendArray) => {
    return `
        ${friendArray.map(friend => {
            return `
                <section class="friend__Card">
                    <img class="friend__image" src="../../styles/images/user.svg">
                    <div class="friend__text">
                        <div class="friend__name">${friend.username}</div>
                        <div class="friend__remove">
                            <button id="removeFriendBtn--${friend.id}">Remove Friend</button>
                        </div>
                    </div>
                </section>
            `
        }).join("")}
    `
}