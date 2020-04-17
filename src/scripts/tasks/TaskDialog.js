const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".dialogContainer")
export const TaskDialog = () => {
    contentTarget.innerHTML = `
    <dialog id="taskDialog">
        <input type="text" onfocus="this.value=''" placeholder="Task Name" id="task"><br><br>
        <label for="dateToComplete" id="dateToCompleteLabel">Date to complete</label>
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
        const currentUserId = parseInt(sessionStorage.getItem("userId"))
        const complete = false
        const customTaskEvent = new CustomEvent("saveTaskButtonClicked",{
            detail: {
                task:taskName,
                userId: currentUserId,
                complete:complete,
                dateToComplete:dateToComplete
            }
        })
        eventHub.dispatchEvent(customTaskEvent)
        const dialogContainer = document.querySelector("#taskDialog")
        dialogContainer.close()
    }
})