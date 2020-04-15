/*
    By Yitbarek
    This component is responsible for html representation of 
    each tasks
*/
const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".saveTaskButtonContainers")

export const Task = () => {
    contentTarget.innerHTML = `
    <section>
        <input type="text" placeholder="task name" id="task">
        <label for="dateToComplete">Date to complete</label>
        <input type="date" id="dateToComplete">
        <button id="saveTask">Add task</button>
    </section>
    `
}

contentTarget.addEventListener("click", e=>{
    const taskName = document.querySelector("#task").value
    const dateToComplete = document.querySelector("#dateToComplete").value
    const complete = false
    if(e.target.id === 'saveTask'){
        const customTaskEvent = new CustomEvent("addTaskButtonClicked",{
            detail: {
                task:taskName,
                userId: 1,
                complete:complete,
                dateToComplete:dateToComplete
            }
        })
        eventHub.dispatchEvent(customTaskEvent)
    }
})