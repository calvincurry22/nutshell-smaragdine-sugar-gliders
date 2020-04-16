// Author: Calvin Curry 
// This module is responsible for rendering the html representation of the article form in the UI.

import { saveArticle } from "./ArticlesProvider.js"

const contentTarget = document.querySelector(".dialogContainer")

const eventHub = document.querySelector("#container")

export const ArticleDialog = () => {
    contentTarget.innerHTML = `
        <dialog class="article__Dialog">
            <form action="">
                <label for="articleTitle">Title:</label><br>
                <input type="text" id="article--Title" name="articleTitle"><br>
                <label for="articleSynopsis">Enter a Synopsis:</label><br>
                <input type="textarea" id="article--Synopsis" name="articleSynopsis"><br>
                <label for="articleUrl">Enter URL:</label><br>
                <input type="url" id="article--Url" name="articleUrl"><br><br>
            </form>
            <button id="button--SaveArticle">Save Article</button>
            <button id="button--closeDialog">Close</button>
        </dialog>
    `
}



eventHub.addEventListener('addArticleBtnClicked', customEvent => {
    ArticleDialog()
    const dialogElement = document.querySelector(".article__Dialog")
    dialogElement.showModal()
})

contentTarget.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "button--SaveArticle") {
        const articleTitle = document.querySelector("#article--Title").value
        const articleSynopsis = document.querySelector("#article--Synopsis").value
        const articleUrl = document.querySelector("#article--Url").value
        const currentDate = Date.now()
        const dialogElement = document.querySelector(".article__Dialog")
        const currentUserId = parseInt(sessionStorage.getItem("userId"))

        const [a, b] = articleUrl.split("//")

        if(a === "http:" || a === "https:") {
        
            const newArticle = {
                userId: currentUserId,
                url: articleUrl,
                title: articleTitle,
                synopsis: articleSynopsis,
                timestamp: currentDate
            }
            saveArticle(newArticle)
            dialogElement.close()
        } 
        else {
           alert("Url must begin with http:// or https://")
        }
    }    
})

contentTarget.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "button--closeDialog") {
        const dialogElement = document.querySelector(".article__Dialog")
        dialogElement.close()
    }
})