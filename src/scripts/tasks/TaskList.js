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
    const currentUserId = parseInt(sessionStorage.getItem("userId"))
    const newTask = {
        task: e.detail.task,
        userId: currentUserId,
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
                return `
                <section class="task ${isAFriendClass === true ? 'italicized' : ''}">
                ${
                        `
                        <div class="task__name" id="taskName--${individualTask.id}">${individualTask.task}</div>
                        <div class="task__textImage">
                            <div class="task__image"><img src="../../styles/images/tick.svg"></div>
                            <div class="task__text">
                                <div class="task__complete" id="taskComplete--${individualTask.id}">Complete: ${individualTask.complete}</div>
                                <div class="task__date" id="dateToComplete--${individualTask.id}">Finish by: ${individualTask.dateToComplete}</div>
                                <div class="task__user">Posted by: ${userWhoWroteEvent.username}</div>
                            </div>
                        </div>
                        <div class="task__buttons">
                        ${individualTask.userId === currentUserId ? `<div class="task__check"><label for="checkbox--${individualTask.id}">Complete:</label><input type = "checkbox" id = "checkbox--${individualTask.id}"></div>`:""}
                        ${individualTask.userId === currentUserId ? `<button id="deleteTaskButtonClicked--${individualTask.id}">x</button>`:""}
                        </div>
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