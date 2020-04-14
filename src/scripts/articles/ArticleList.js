// Author: Calvin Curry 
// This module is responsible for providing the function that renders each article in the article list to the UI.

import { Article } from "./Article.js";
import { useArticles } from "./ArticlesProvider.js";
import { deleteArticle } from "./ArticlesProvider.js"
import { ArticleDialogButton } from "./ArticleDialogButton.js";

let contentTarget = document.querySelector(".articlesContainer")
const eventHub = document.querySelector("#container")


export const ArticleList = () => {

    const articleCollection = useArticles()

    articleCollection.map(articleObj => {
        contentTarget.innerHTML += Article(articleObj)
    })

}


eventHub.addEventListener("saveArticle", customEvent => {
    contentTarget.innerHTML = ""
    ArticleList()
    ArticleDialogButton()
})


contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteArticleBtn--")) {
        const [prefix, articleId] = clickEvent.target.id.split("--")
        deleteArticle(articleId)
    }
})