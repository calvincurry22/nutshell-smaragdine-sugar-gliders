const eventHub = document.querySelector("#container")
let tasks = []
export const useTasks = () => tasks.slice()
export const getTasks = () => {
    return fetch('http://localhost:8088/tasks')
    .then(response => response.json())
    .then(data=>tasks = data)
}
export const dispatchEventStateChange = () => {
    const taskStateChangedEvent = new CustomEvent("taskStateChanged")
    eventHub.dispatchEvent(taskStateChangedEvent) 
}
export const saveTasks = (task) => {
    return fetch('http://localhost:8088/tasks',{
        "method":"POST",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(getTasks)
    .then(dispatchEventStateChange)
}
export const deleteTask = (taskId) => {
    return fetch(`http://localhost:8088/tasks/${taskId}`,{
        "method":"DELETE",
    })
    .then(getTasks)
    .then(dispatchEventStateChange)
}