// Author: Calvin Curry 
// This module is responsible for providing the function that renders each article in the article list to the UI.

import { Article } from "./Article.js";
import { useArticles, getArticles } from "./ArticlesProvider.js";
import { getUsers, useUsers } from "../user/userProvider.js";
import { getFriends, useFriends } from "../friends/FriendsProvider.js";
import { deleteArticle } from "./ArticlesProvider.js"
import { ArticleDialogButton } from "./ArticleDialogButton.js";

let contentTarget = document.querySelector(".articlesContainer")
const eventHub = document.querySelector("#container")



eventHub.addEventListener("componentStateChanged", event => {
    ArticleList()
})

export const ArticleList = () => {
        renderArticles()
}

const renderArticles = () => {
    const promise = Promise.all([
        getUsers(),
        getArticles(),
        getFriends()
    ])
    promise.then(() => {
        const allTheUsers = useUsers()
        const allTheFriends = useFriends()
        const articleCollection = useArticles()
        const currentUserId = parseInt(sessionStorage.getItem("userId"))

        const filteredFriends = allTheFriends.filter(friendObj => friendObj.userId === currentUserId)
        const friends = filteredFriends.map(friend => {
            return allTheUsers.find(user => user.id === friend.friendUserId)
        })

        const articleHTML = articleCollection.map(articleObj => {
            let isAFriendClass = false
            friends.map(friend => {
                if (friend.id === articleObj.userId) {
                    isAFriendClass = true
                }
            })
            const userWhoWroteEvent = allTheUsers.find(user => user.id === articleObj.userId)
            return Article(articleObj, isAFriendClass, userWhoWroteEvent)
        }).join("")

        contentTarget.innerHTML = `
        <div class="article__title">News</div>
        ${ArticleDialogButton()}
        ${articleHTML}
        `
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