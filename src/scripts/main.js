import { getArticles } from "./articles/ArticlesProvider.js";
import { ArticleList } from "./articles/ArticleList.js";
import { ArticleDialogButton } from "./articles/ArticleDialogButton.js";
import "./articles/ArticleDialog.js"

getArticles()
.then(ArticleList)
.then(ArticleDialogButton)