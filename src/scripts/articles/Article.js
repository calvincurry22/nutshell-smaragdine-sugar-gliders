// Author: Calvin Curry
// This module is responsible for providing the html representation for each article in the article list.


export const Article = (articleObject) => {
    return `
        <section class="article__Card">
            <div class="article_imageContainer">
            <img class="article__image" src="../../styles/images/Article-Icon.svg">
            </div>
            <div class="article__text">
                <div class="article__name">${articleObject.title}</div>
                <div>${articleObject.synopsis}</div>
                <div class="article__linkDelete">
                <a class="article__link" href="${articleObject.url}" target="_blank">Click for more info</a>
                <button id="deleteArticleBtn--${articleObject.id}">X</button>
                </div>
            </div>
        </section>
    `
}