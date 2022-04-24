const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const today = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
const btnAddTask = document.getElementById("addTask");

//Nome das classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variaveis
let List = [];
let id = 0;

input.value = ''

//Recuperando Lista(Se houver) do LocalStorage
function recoverToDoList(){
    const ListSave = localStorage.getItem('TODOLIST')
    if(!ListSave) return;
    List = JSON.parse(ListSave)
    id = List.length
    for(task of List){
        addToDo(task.name,task.id,task.done,task.trash)
    }
}
recoverToDoList();

//Adcionando Função de apagar localStorage
clear.addEventListener('click',() =>{
    localStorage.setItem('TODOLIST',"")
    location.reload();
})

//Adcionando a data atual
dateElement.innerHTML = today.toLocaleDateString("pt-BR", options);

//Função para adcionar a tarefa
function addToDo(todo, id, done, trash) {
  if (trash) return;
  const position = "beforeend";
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `
  <li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${todo}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
  </li>

   `;

  list.insertAdjacentHTML(position, item);
}

//Adcionando a tarefa ao pressionar "enter" ou clicar no botao
input.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    if (!input.value) return;
    addToDo(input.value,id,false,false);
    List.push({
        name: input.value,
        id: id,
        done: false,
        trash: false
    })
    input.value = "";
    id++;
    localStorage.setItem('TODOLIST',JSON.stringify(List))
  }
});

// btnAddTask.addEventListener("click", (e) => {
//   if (!input.value) return;
//   addToDo(input.value);
//   input.value = "";
//   input.focus();
// });

//Concluindo a tarefa

function completeToDo(el){
    el.classList.toggle(CHECK)
    el.classList.toggle(UNCHECK)
    el.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
    List[el.id].done = List[el.id].done ? false : true
}

//Removendo a tarefa

function removeToDo(el){
    el.parentNode.remove()
    List[el.id].trash = true
}

//selescionando dinamicamente os elementos clicados

list.addEventListener('click',(event) =>{
    const el = event.target
    if(el.classList.contains('co')){completeToDo(el)}
    if(el.classList.contains('de')){removeToDo(el)}
    localStorage.setItem('TODOLIST',JSON.stringify(List))
})

