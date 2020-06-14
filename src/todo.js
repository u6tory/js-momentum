const toDoForm = document.querySelector(".js-todo-form"),
  toDoInput = toDoForm.querySelector("input"),
  pending = document.querySelector(".js-pending"),
  finished = document.querySelector(".js-finished");

const TODOS_LS = "todos";
const DONES_LS = "dones";

let toDos = [];
let dones = [];

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(todo => {
      paintToDo(todo.text);
    });
  }
}

function loadDones() {
  const loadedtoDones = localStorage.getItem(DONES_LS);
  if (loadedtoDones !== null) {
    const parsedDones = JSON.parse(loadedtoDones);
    parsedDones.forEach(done => {
      paintFinish(done.text);
    });
  }
}

function deleteToDo(event) {
  const btn = event.target,
    li = btn.parentNode;
  pending.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteDone(event) {
  const btn = event.target,
    li = btn.parentNode;
  console.log(li);
  finished.removeChild(li);
  const cleanDones = dones.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  dones = cleanDones;
  saveDones();
}

function backDone(event) {
  const father = event.target.parentNode,
    text = father.querySelector("span").innerText,
    li = document.createElement("li"),
    delBtn = document.createElement("button"),
    doneBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerHTML = "⬜";
  doneBtn.addEventListener("click", finishToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(doneBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = father.id;
  pending.appendChild(li);
  const doneObj = dones.filter(function(toDo) {
    return toDo.id === parseInt(father.id, 10);
  });
  toDos.push(doneObj[0]);
  saveToDos();
  deleteDone(event);
}

function finishToDo(event) {
  const father = event.target.parentNode,
    text = father.querySelector("span").innerText,
    li = document.createElement("li"),
    delBtn = document.createElement("button"),
    backBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteDone);
  backBtn.innerHTML = "✅";
  backBtn.addEventListener("click", backDone);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(backBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = father.id;
  finished.appendChild(li);
  const doneObj = toDos.filter(function(toDo) {
    return toDo.id === parseInt(father.id, 10);
  });
  dones.push(doneObj[0]);
  saveDones();
  deleteToDo(event);
}

function saveDones() {
  localStorage.setItem(DONES_LS, JSON.stringify(dones));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"),
    delBtn = document.createElement("button"),
    doneBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerText = "⬜";
  doneBtn.addEventListener("click", finishToDo);
  const span = document.createElement("span");
  const newId = Date.now() - toDos.length - dones.length + 1;
  span.innerText = text;
  li.appendChild(doneBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  pending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinish(text) {
  const li = document.createElement("li"),
    delBtn = document.createElement("button"),
    backBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteDone);
  backBtn.innerText = "✅";
  backBtn.addEventListener("click", backDone);
  const span = document.createElement("span");
  const newId = Date.now() - toDos.length - dones.length + 1;
  span.innerText = text;
  li.appendChild(backBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  finished.appendChild(li);
  const doneObj = {
    text: text,
    id: newId
  };
  dones.push(doneObj);
  saveDones();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  loadDones();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
