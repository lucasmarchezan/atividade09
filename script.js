document.addEventListener("DOMContentLoaded", function() {
const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("add-Task")
const taskList = document.getElementById("task-list")
const filter = document.querySelectorAll(".filter")
const toggleThemeBtn = document.getElementById("toggletheme")

let tasks = JSON.parse(localStorage.getItem("tasks"))
let theme = localStorage.getItem("theme") || "light"

if (theme === "dark"){
    document.body.classList.add("dark")

}

toggleThemeBtn.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode")
  if (document.body.classList.contains("dark")){
    theme = "dark"
  } else {
    theme = "light"
  } 
  localStorage.setItem("theme", theme)
})

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks(filter){
    if (filter === undefined) filter = "all"
    taskList.innerHTML = ""

    tasks.forEach(function (task, index){
        if (filter === "pending" && task.completed) return
        if (filter === "completed" && !task.completed) return

        const li = document.createElement("li")

        if (task.completed === true){
            li.className = "completed"
        } else {
            li.className = ""
        }
        
        li.innerHTML =`
        <span class="task-text">${task.text}</span>
        <button class="edit"><img class="btnTasks" scr="assets/edicao img.png"><button>
        <button class="delete"><img class="btnTasks" scr="assets/lixeira.png"><button>
        `
li.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")){
        tasks.splice(index, 1)
    } else if (e.target.classList.contains("edit")){
    const newText = prompt("editar tarefa:", task.text)
    if (newText) tasks[index].text = newTexts     
    } else {
        if(tasks[index].completed === true){
            tasks[index].completed = false
        } else {
            tasks[index].completed = true
        }
    }
    saveTasks()
    renderTasks(filter)
})

 taskList.appendChild(li)
    });
}

addTaskBtn.addEventListener("click", function(){
    const text = taskInput.value.trim() 
    if (text) {
        tasks.push({text: text, completed: false})
        saveTasks()
        renderTasks()
        taskInput.value = ""
    }
})

filter.forEach(function(button) {
    button.addEventListener("click", function(){
        filter.forEach(function(btn){
            btn.classList.remove("active")
        })
        button.classList.add("active")
        renderTasks(button.dataset.filter)
    })
})

renderTasks()
})
