// Author: Calvin Curry
// This module is responsible for providing the parsed article data from the database.JSON file. 


const eventHub = document.querySelector("#container")


const dispatchSavedArticle = () => {
    const saveArticleEvent = new CustomEvent("saveArticle")
    eventHub.dispatchEvent(saveArticleEvent)
}



let articles = []


export const getArticles = () => {
    return fetch("http://localhost:8088/articles")
    .then(res => res.json())
    .then(parsedArticles => articles = parsedArticles)
}


export const useArticles = () => articles.slice()




export const saveArticle = (newArticleObj) => {
    fetch("http://localhost:8088/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArticleObj)
    })
    .then(getArticles)
    .then(dispatchSavedArticle)
}

export const deleteArticle = (articleId) => {
    return fetch(`http://localhost:8088/articles/${articleId}`, {
        method: "DELETE"
    })
        .then(getArticles)
        .then(dispatchSavedArticle)
}
