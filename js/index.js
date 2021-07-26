// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');

// Evenet Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);
// Functions

function addTodo(event) {
  event.preventDefault();
  // Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;

  saveLocalTodos(todoInput.value)
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);;
  // check mark button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = `<i class="fas fa-check"></i>`;
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);
  // check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // append to listeners
  todoList.appendChild(todoDiv);
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });
  }

  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('complated')
  }

}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('complated')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none'
        } break;

      case 'uncompleted':
        if(!todo.classList.contains('complated')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none'
        }
    }
  })
}

function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex  = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
