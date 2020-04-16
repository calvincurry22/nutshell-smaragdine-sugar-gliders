// Author: Calvin Curry
// This module is responsible for providing the html representation for each article in the article list.


export const Article = (articleObject, isAFriendClass, userWhoWroteEvent) => {
    return `
        <section class="article__Card ${isAFriendClass === true ? 'italicized' : ''}">
            <h4>${articleObject.title}</h4>
            <p>${articleObject.synopsis}</p>
            <a href="${articleObject.url}" target="_blank">Click for more info</a>
            <div class="article__detail">posted by: ${userWhoWroteEvent.username}</div>
            <button id="deleteArticleBtn--${articleObject.id}">Delete Article</button>
        </section>
    `
}