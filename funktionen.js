'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
let newDate = document.getElementById('date');
let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
};
let today = new Date();
newDate.innerHTML += today.toLocaleDateString('de-DE', options);

// Animation

let h1 = document.getElementById('h_1');
h1.style.left = '400px';
let x = 0;
function animiere() {
    if (x < 500) {
        h1.style.left = x++ + 'px';
        h1.style.top = Math.sin(x / 50) * 100 + 100 + 'px';
        requestAnimationFrame(animiere);
    }
}
animiere();

//Selector

let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterCheck = document.querySelector('.todo-filter');

//Event Listener

todoButton.addEventListener('click', AddTodoEvent);
todoList.addEventListener('click', deleteCompleted);
window.addEventListener('beforeunload', store);
window.addEventListener('DOMContentLoaded', lesen);

//Funktionen

function AddTodoEvent(event) {
    event.preventDefault();
    addTodo(todoInput.value)
}

function addTodo(todoText) {

    // create li
    let newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');

    // create buttons

    let checkButton = document.createElement('button');
    checkButton.classList.add('check-btn');
    newTodo.appendChild(checkButton);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    newTodo.appendChild(deleteButton);

    todoList.appendChild(newTodo);
    todoInput.value = " ";

}

// funktion delete - check-buttons
function deleteCompleted(e) {
    let item = e.target;
    if (item.classList.contains('delete-btn')) {

        item.closest('li').classList.add('down');

        setTimeout(function () {
            item.closest('li').remove()
        }, 1000);
    }
    if (item.classList.contains('check-btn')) {
        item.closest('li').classList.toggle('checked');
    }

}

// funktion in localStorage
function store() {
    let ListElements = document.querySelectorAll('.todo-item');
    let TodoList = [];
    for (let i = 0; i < ListElements.length; i++) {
        TodoList.push(ListElements[i].textContent);

    }
    localStorage.setItem('Todos', TodoList);

}

function lesen() {
    let TodoList = localStorage.getItem('Todos').split(',');

    console.log(TodoList.length);
    for (let i = 0; i < TodoList.length; i++) {
        if (TodoList != 0) {
            localStorage.setItem('Todos', TodoList);

            let todoText = TodoList[i];
            addTodo(todoText);

        }

    }
}
