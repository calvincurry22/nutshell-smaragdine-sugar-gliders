import { useTasks, saveTasks } from "./TaskProvider.js"
const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".eventsContainer")

eventHub.addEventListener("addTaskButtonClicked", e=>{
    const newTask = {
        task: e.detail.task,
        userId: "",
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
                    `<input type = "checkbox" id = "checkbox--${individualTask.id} 
                        value = "${individualTask.task}">
                    <ul>
                        <li>Task: ${individualTask.task}</li>
                        <li>Complete: ${individualTask.complete}</li>
                        <li>Date to complete: ${individualTask.dateToComplete}</li>
                    </ul>`
                }
                </section>`
        } 
    })
}
contentTarget.addEventListener("click", e=>{
    if(e.target.id.startsWith("checkbox--")){
        const [_, taskChecked] = e.target.id.split("--")
        const taskCompleted = new CustomEvent("taskCompleted", {
            detail: {
                completedTask: taskChecked
            }
        })
        eventHub.dispatchEvent(taskCompleted)
    }
    
})
eventHub.addEventListener("taskStateChanged", e=>{
    TaskList()
})

export const TaskList = () => {
    const tasks = useTasks()
    render(tasks)
}