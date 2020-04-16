import { TaskDialog } from "./TaskDialog.js"

/*
    By Yitbarek
    This component is responsible for html representation of 
    each tasks
*/
const contentTarget = document.querySelector(".addTaskButtonContainers")

export const Task = () => {
    contentTarget.innerHTML = `<button id="showTaskButton">Add Task</button>`
}

contentTarget.addEventListener("click", e=>{
    if(e.target.id === "showTaskButton"){
        TaskDialog()
        const taskDialog = document.querySelector("#taskDialog")
        taskDialog.showModal() 
    }
})


