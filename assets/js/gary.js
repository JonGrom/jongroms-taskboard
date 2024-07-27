// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));  
// localStorage.clear()


/* 
   ******************************************************************************
   GARY:RENAME THE ID OF THE DIV ON LINE 65 TO "todo" INSTEAD OF 'to-do'
   ******************************************************************************
*/


// generate task id
function generateTaskId() {
   nextId = nextId+1;
   return nextId;
}

// Make modal inputs and stored tasks into draggable cards

// GARY: When you create each card, you need to add a data attribute to the card so that when it
// is dropped later, we can see that data; we also do this for the delete button; see lines
// 26 and 34 below
function createTaskCard(task) {
    console.log('no freakin way, dog')
    const newCard = 
        $('<div>')
        .draggable({
            zIndex: 100,
        })
        .attr('data-task-id', task.id)
        .addClass('draggable m-3 mt-border bg-white')  //
        .append($('<h5>').addClass('border-bottom bg-light').text(task.title).css('background-color', 'light-gray'))
        .append($('<p>').text(task.description))
        .append($('<p>').text(task.date))
        .append($('<button>')
            .addClass('bg-danger border-0 text-white rounded mb-3')
            .css('background-color', 'red')
            .text('Delete')
            .attr('data-task-id', task.id)
            .on("click", handleDeleteTask)     
        );
    return newCard
}

// that constructed card back here so we can put it in the correct lane
function renderTaskList() {
    $("#todo-cards").html("")
    $("#done-cards").html("")
    $("#in-progress-cards").html("")

    taskList.forEach(task => {
        const card = createTaskCard(task);
        // GARY: now put the card in the correct lane based on card status
        $(`#${task.status}-cards`).append(card)

        console.log(task)
    });

}

//Handle addition of task
function handleAddTask(title, date, description){

    //get user input
    const titleInput = title.val()
    const dateInput = date.val()
    const descriptionInput = description.val()

    //generate task id
    generateTaskId()
    //make object and store in local storage
    task = {
        title: titleInput,
        date: dateInput,
        description: descriptionInput,
        id: nextId,
        status: 'in-progress',                // GARY:  use this instead of location
    }
    if (taskList){
        taskList.push(task) 
    } else {
        taskList = [task]
    }

    //Update local storage
    console.log(task)
    console.log(taskList)
    localStorage.setItem("tasks", JSON.stringify(taskList))

    // GARY: You don't need these two lines. Just let the renderTaskList function build the page??
    // createTaskCard(task)??
    // localStorage.setItem("nextId", JSON.stringify(nextId))

    renderTaskList()
}

// Todo: create a function to handle deleting a task
// GARY:  Look at event.target.dataset and you should see some useful info there
function handleDeleteTask(event){
    console.log('delete task')
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // GARY:  because we added the task id as a data attribute, we can now get that id and new status from the event
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    console.log(taskId, newStatus)
    
    console.log(taskId, newStatus)  // GARY:  check this console.log and you'll see we now know the id of the draggable and where it's dropped to
    for (let task of taskList) {
      if (task.id === parseInt(taskId)) {
        task.status = newStatus;
      }
    }

    console.log(taskList)

    // save and render
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
  }




// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    //Listen for user inputs
    const title = $('#title-input')
    const date = $('#datepicker')
    const description = $('#description-input')
    
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
      
    //Make lanes droppable
    
    // $('.lane').droppable({
    //         drop: handleDrop,
    //         accept: '.draggable',
    //     })
    // $('#in-progress-cards').droppable({
    //         drop: handleDrop,
    //     })
    // $('#done-cards').droppable({
    //         drop: handleDrop
    // })
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

    //get today from dayjs
    const today = dayjs()
    console.log(today)

    console.log("what the hell")
    renderTaskList();

});