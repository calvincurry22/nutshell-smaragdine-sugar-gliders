// Author: Calvin Curry 
// This module is responsible for providing the function that renders each article in the article list to the UI.

import { Article } from "./Article.js";
import { useArticles, getArticles } from "./ArticlesProvider.js";
import { deleteArticle } from "./ArticlesProvider.js"
import { ArticleDialogButton } from "./ArticleDialogButton.js";

let contentTarget = document.querySelector(".articlesContainer")
const eventHub = document.querySelector("#container")

// here

eventHub.addEventListener("componentStateChanged", event => {
    ArticleList()
})

export const ArticleList = () => {
    renderArticles()
}

const renderArticles = () => {
    getArticles().then(() => {
        const articleCollection = useArticles()
        contentTarget.innerHTML = `
        ${articleCollection.map(articleObj => Article(articleObj)).join("")}
        ${ArticleDialogButton()}
        `
})}
// to here


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