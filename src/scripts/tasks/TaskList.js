import { useTasks, saveTasks, deleteTask, updateTask } from "./TaskProvider.js"
const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".eventsContainer")

eventHub.addEventListener("addTaskButtonClicked", e=>{
    const newTask = {
        task: e.detail.task,
        userId: 1,
        complete: e.detail.complete,
        dateToComplete: e.detail.dateToComplete
    }
    saveTasks(newTask)
})

const render = (taskObject) => {
    contentTarget.innerHTML = taskObject.map(individualTask => {
        if(individualTask.complete !== true)
        {
            return `<section>
            ${                
                    `<input type = "checkbox" id = "checkbox--${individualTask.id}">
                    <ul>
                    <li id = "taskName--${individualTask.id}">Task: ${individualTask.task}</li>
                    <li id = "taskComplete--${individualTask.id}">Complete: ${individualTask.complete}</li>
                        <li id = "dateToComplete--${individualTask.id}">Date to complete: ${individualTask.dateToComplete}</li>
                        </ul>
                        <button id = "deleteTaskButtonClicked--${individualTask.id}">
                        Delete</button>`
            }
                </section>`
        }
    }).join("")
}
contentTarget.addEventListener("click", e=>{
    if(e.target.id.startsWith("deleteTaskButtonClicked--")){
        const [_, taskToDelete] = e.target.id.split("--")
        console.log('clicked ',taskToDelete)
        deleteTask(taskToDelete)
    }
})

contentTarget.addEventListener("click", e=>{
    if(e.target.id.startsWith("checkbox--")){
        const [_, taskId] = e.target.id.split("--")
        const tasks = useTasks()
        const userTask = tasks.find(task=>task.id === parseInt(taskId))
        const task_Name = userTask.task
        let task_Complete = true
        const dateTo_Complete = userTask.dateToComplete
        const newTask = {
            id: taskId,
            task: task_Name,
            userId: 3,
            complete: task_Complete,
            dateToComplete: dateTo_Complete
        }
        updateTask(newTask)
    }    
})

eventHub.addEventListener("taskStateEventChanged", e=>{
    TaskList()
})

export const TaskList = () => {
    const tasks = useTasks()
    render(tasks)
}