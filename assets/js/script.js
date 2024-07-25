// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// localStorage.clear()

// Todo: create a function to generate a unique task id
function generateTaskId() {
   nextId = [lastId]+1
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log('no freakin way, dog')
    //TODO: add button and id to div
    $('#todo-cards').append($('<div>').addClass('m-3 mt-border bg-white').append($('<h5>').addClass('border-bottom bg-light').text(task.title).css('background-color', 'light-gray')).append($('<p>').addClass('').text(task.description)).append($('<p>').addClass('').text(task.date)))
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
}

// Todo: create a function to handle adding a new task. 
function handleAddTask(title, date, description){

    //get user input
    const titleInput = title.val()
    const dateInput = date.val()
    const descriptionInput = description.val()

    //make object and store in local storage
    console.log('holy moly')
    task = {
        title: titleInput,
        date: dateInput,
        description: descriptionInput,
        status: 'to-do'
    }
    if (taskList){
        taskList.push(task) 
    } else {
        taskList = [task]
    }

    //
    console.log(task)
    console.log(taskList)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    createTaskCard(task)
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
 console.log('yecky')
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    //Listen for user inputs
    const title = $('#title-input')
    const date = $('#datepicker')
    const description = $('#description-input')

    //Make lanes droppable
    $('#to-do').attr('ui-droppable')
    $('#to-do').on("dropactivate", handleDrop);
    $('#in-progress').attr('ui-droppable')
    $('#in-progress').on("dropactivate", handleDrop);
    $('#done').attr('ui-droppable')
    $('#done').on("dropactivate", handleDrop);
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
    });

    //Listen for add task button click event in modal
    $('#add-task-btn')
    $('#add-task-btn').on('click', function(){
            handleAddTask(title, date, description)
        }
    );
    console.log("what the hell")
    //render task list if local storage

    if (localStorage){
        renderTaskList()
    }

    
});
