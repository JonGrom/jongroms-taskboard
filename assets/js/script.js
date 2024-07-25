// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId = [lastId]+1
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    $('<div>').attr('class', '').append
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
}

// Todo: create a function to handle adding a new task
//Add task to local storage and update it that way. 
function handleAddTask(title, date, description){
    console.log('holy moly')
    task = {
        title: title,
        date: date,
        description: description,
        status: 'toDo'
    }
    taskList.push(task)
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
    const title = $('#title-input').val();
    const date = $('#datepicker').val();
    const description = $('#description-input').val();

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
