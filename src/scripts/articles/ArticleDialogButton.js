// Author: Calvin Curry
// This module is responsible for rendering the button to add a new article to the user's article list. 


const contentTarget = document.querySelector(".articlesContainer")
const eventHub = document.querySelector("#container")

// here
export const ArticleDialogButton = () => {
    return `
        <button id="button--AddArticle">Add new Article</button>
    `
}

//to here




eventHub.addEventListener('click', (clickEvent) => {

    if (clickEvent.target.id === "button--AddArticle") {
      const addArticleEvent = new CustomEvent('addArticleBtnClicked')
      eventHub.dispatchEvent(addArticleEvent)
    }

})
