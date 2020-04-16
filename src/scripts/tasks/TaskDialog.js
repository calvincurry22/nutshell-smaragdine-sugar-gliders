const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".dialogContainer")
export const TaskDialog = () => {
    contentTarget.innerHTML = `
    <dialog id="taskDialog">
        <input type="text" placeholder="task name" id="task">
        <label for="dateToComplete">Date to complete</label>
        <input type="date" id="dateToComplete">
        <button id="saveTask">Save task</button>
        <button id="closeDialog">Close</button>
    </dialog>
    `
}

contentTarget.addEventListener("click", e=>{
    if(e.target.id === 'saveTask'){
        const taskName = document.querySelector("#task").value
        const dateToComplete = document.querySelector("#dateToComplete").value
        const complete = false
        const customTaskEvent = new CustomEvent("saveTaskButtonClicked",{
            detail: {
                task:taskName,
                userId: 1,
                complete:complete,
                dateToComplete:dateToComplete
            }
        })
        eventHub.dispatchEvent(customTaskEvent)
        const dialogContainer = document.querySelector("#taskDialog")
        dialogContainer.close()
    }
})