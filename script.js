const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let todos = [];

// Завантаження списку справ з Local Storage при завантаженні сторінки
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  render();
}

// Функція для збереження справ в Local Storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//todo = {id: number, text: string, checked: boolean}

/* <li>
  <input type ='checkbox'><span>Text</span><button>delete</button>
</li> */

let numb = 1;
function newTodo() {
  let text = window.prompt("enter todo");
  let todo = { id: numb++, text, checked: false };
  todos.push(todo);
  console.log("todos", todos);
  saveTodos();
  render();
}


function render() {
  list.innerHTML = todos.map((todo) => renderTodo(todo)).join("");
  itemCountSpan.innerHTML = todos.length;
  uncheckedCountSpan.innerHTML = todos.filter((todo) => !todo.checked).length;
}

function renderTodo(todo) {
  return `<li class="${classNames.TODO_ITEM}">
  <input type ='checkbox'  class="${classNames.TODO_CHECKBOX}" ${todo.checked ? "checked" : ""} onchange="toggletodo(${todo.id})"><span class="${classNames.TODO_TEXT}">${
    todo.text
  }</span><button class="${classNames.TODO_DELETE}" onClick ="deleteTodo(${todo.id})">delete</button>
</li>`;
}


function deleteTodo(id){
  //delete todo from array todos 
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();

}

function toggletodo(id){
  for(let i=0; i<todos.length; i++){
    if(todos[i].id ===id){
      todos[i].checked = !todos[i].checked; 
      saveTodos();
      render()
    }
  }
}