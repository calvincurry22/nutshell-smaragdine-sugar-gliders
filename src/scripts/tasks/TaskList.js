/*
    By Yitbarek 
    This component is responsible for displaying all the tasks that are 
    not complete
*/
import { useTasks, saveTasks, deleteTask, updateTask, getTasks } from "./TaskProvider.js"
import { Task } from "./TaskButton.js"
import { getUsers, useUsers } from "../user/userProvider.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"



const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".userTasksContainer")

eventHub.addEventListener("saveTaskButtonClicked", e=>{
    const newTask = {
        task: e.detail.task,
        userId: 1,
        complete: e.detail.complete,
        dateToComplete: e.detail.dateToComplete
    }
    saveTasks(newTask)
})

const render = () => {
    const promise = Promise.all([
        getUsers(),
        getTasks(),
        getFriends()
    ])
    promise.then(() => {
        const tasks = useTasks()
        const usersCollection = useUsers()
        const friendsCollection = useFriends()
        const currentUserId = parseInt(sessionStorage.getItem("userId"))

        const filteredFriends = friendsCollection.filter(friendObj => friendObj.userId === currentUserId)
        const friends = filteredFriends.map(friend => {
            return usersCollection.find(user => user.id === friend.friendUserId)
        })

        contentTarget.innerHTML = tasks.map(individualTask => {
            let isAFriendClass = false
            friends.map(friend => {
                if (friend.id === individualTask.userId) {
                    isAFriendClass = true
                }
            })
            const userWhoWroteEvent = usersCollection.find(user => user.id === individualTask.userId)
            if(individualTask.complete !== true)
            {
                return `<section class="task ${isAFriendClass === true ? 'italicized' : ''}">
                ${
                        `<input type = "checkbox" id = "checkbox--${individualTask.id}">
                        <ul>
                            <li id = "taskName--${individualTask.id}">Task: ${individualTask.task}</li>
                            <li id = "taskComplete--${individualTask.id}">Complete: ${individualTask.complete}</li>
                            <li id = "dateToComplete--${individualTask.id}">Date to complete: ${individualTask.dateToComplete}</li>
                            <li>Posted by: ${userWhoWroteEvent.username}</li>
                        </ul>
                        <button id = "deleteTaskButtonClicked--${individualTask.id}">x</button>
                        `
                }
                    </section>`
            }
        }).join("")
        Task()
    })
}
contentTarget.addEventListener("click", e=>{
    if(e.target.id.startsWith("deleteTaskButtonClicked--")){
        const [_, taskToDelete] = e.target.id.split("--")
        deleteTask(taskToDelete)
    }
})

contentTarget.addEventListener("click", e=>{
    if(e.target.id.startsWith("checkbox--")){
        const [_, taskId] = e.target.id.split("--")
        const tasks = useTasks()
        const userTask = tasks.find(task=>task.id === parseInt(taskId))
        const task_Name = userTask.task
        const currentUserId = parseInt(sessionStorage.getItem("userId"))
        let task_Complete = true
        const dateTo_Complete = userTask.dateToComplete
        const newTask = {
            id: taskId,
            task: task_Name,
            userId: currentUserId,
            complete: task_Complete,
            dateToComplete: dateTo_Complete
        }
        updateTask(newTask)
    }   
})

eventHub.addEventListener("componentStateChanged", event =>{
    TaskList()
})

export const TaskList = () => {
    render()   
}