// Author: Calvin Curry
// This module is responsible for providing the parsed article data from the database.JSON file. 

import { dispatchStateChangeEvent } from "../AppController.js"


const eventHub = document.querySelector("#container")

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
    .then(dispatchStateChangeEvent)
}

export const deleteArticle = (articleId) => {
    return fetch(`http://localhost:8088/articles/${articleId}`, {
        method: "DELETE"
    })
        .then(getArticles)
        .then(dispatchStateChangeEvent)
}
