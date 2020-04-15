/*
    By Yitbarek 
    This component is responsible for managing tasks data
*/
import { dispatchStateChangeEvent } from "../AppController.js"

const eventHub = document.querySelector("#container")

let tasks = []
export const useTasks = () => tasks.slice()
export const getTasks = () => {
    return fetch('http://localhost:8088/tasks')
    .then(response => response.json())
    .then(data=>tasks = data)
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
    .then(dispatchStateChangeEvent)
}
export const deleteTask = (taskId) => {
    
    return fetch(`http://localhost:8088/tasks/${taskId}`,{
        method:"DELETE",
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}


export const updateTask = (task) => {
    return fetch(`http://localhost:8088/tasks/${task.id}`,{
        method:"PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}