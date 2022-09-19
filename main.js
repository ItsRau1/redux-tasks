let list = []
let delIn = []
let endIn = []

let TxtNewTask =  document.querySelector(`#insert-task`)
let BtnAddTask = document.querySelector(`#btn-new-task`)
let TaskList = document.querySelector(`#tasks`)
let get = new Date

TxtNewTask.addEventListener(`keypress` , (e) => {
    if(e.keyCode == 13) {
        SoundNotification()
        if (TxtNewTask.value == ''){
            return alert(`Coloque um nome para a sua tarefa.`)
         }
        let res = confirm(`Deseja adicionar a Task '${TxtNewTask.value}'?`)
        if(res == true){
            insertTask({
            nome: TxtNewTask.value, 
            id: gerarId(),
            day: dayTask(),
            month: monthTask(),
            hour: hourTask(),
            minute: minuteTask(),
            year: yearTask(),
            stats: `Nova Tarefa`
        })
        boxNewTask(list)
        TxtNewTask.value = ``
    }}
    })

BtnAddTask.addEventListener(`click` , (e) => {
    SoundNotification()
    if (TxtNewTask.value == ''){
       return alert(`Coloque um nome para a sua tarefa.`)
    }
    let res = confirm(`Deseja adicionar a Task '${TxtNewTask.value}'?`)
    if(res == true){
        insertTask({
        nome: TxtNewTask.value, 
        id: gerarId(),
        day: dayTask(),
        month: monthTask(),
        hour: hourTask(),
        minute: minuteTask(),
        year: yearTask(),
        stats: `Nova Tarefa`
    })
    boxNewTask(list)
    TxtNewTask.value = ``
}})

function gerarId () {
    return Math.floor(Math.random() * 8000)
}
retrieveList()
function retrieveList () {
    let ListTask = localStorage.getItem(`TaskList`)
    if (ListTask) {
        let tasks = JSON.parse(ListTask)
        for(const item of tasks) {
            verifyAtask(item)
            insertTask(item, false)
        }
        boxNewTask(tasks)
    }

    let delTask = localStorage.getItem(`DelIn`)
    if (delTask) {
        let deltasks = JSON.parse(delTask)
        delTaskBox (deltasks)
    }
    let endTask = localStorage.getItem(`EndIn`)
    if (endTask) {
        let endtasks = JSON.parse(endTask)
        endTaskBox (endtasks)
    }
}

function insertTask (item, newTask = true) {
    list.push(item)
    setTimeout(() => {TaskList.appendChild(createNewTask (item))}, 5000)

    if (newTask) {
        localStorage.setItem(`TaskList`, JSON.stringify(list))
    }
}

function dayTask () {
    let day = get.getDate()
    if (day < 10) {
        day = `0` + day
    }
    return Number(day)
}
function monthTask () {
    let mounth = get.getMonth()

    if (mounth == 0) {
        mounth = `Janeiro`
    } else if (mounth == 1) {
        mounth = `Fevereiro`
    }    if (mounth == 2) {
        mounth = `Março`
    } else if (mounth == 3) {
        mounth = `Abril`
    }    if (mounth == 4) {
        mounth = `Maio`
    } else if (mounth == 5) {
        mounth = `Junho`
    }    if (mounth == 6) {
        mounth = `Julho`
    } else if (mounth == 7) {
        mounth = `Agosto`
    }    if (mounth == 8) {
        mounth = `Setembro`
    } else if (mounth == 9) {
        mounth = `Outubro`
    }    if (mounth == 10) {
        mounth = `Novembro`
    } else if (mounth == 11) {
        mounth = `Dezembro`
    }
    return mounth
}
function hourTask () {
    let hor = get.getHours()
    let hour = Number(hor)
    if (hour < 10) {
        hour = `0` + hour
        return hour
    }
    return hour
}
function minuteTask () {
    let minute = get.getMinutes()
    if (minute < 10) {
        minute = `0` + minute
        return minute
    }return minute
}
function yearTask () {
    let year = get.getFullYear()
    return year
}
function createNewTask (item) {

    let div = document.createElement(`div`)
    div.classList.add(`task-box`)
    div.id = item.id

    div.innerHTML = `            
        <span id="time-task">${item.stats}</span>
        <h2 id="name-task">${item.nome}</h2>
        <p id="task-disc">Dia ${item.day} de ${item.month} do ano de ${item.year}, ${item.hour}:${item.minute} #Task${item.id}</p>
        <div id="end-del">
            <button class="end" onclick="end(${item.id})">Finalizar Tarefa</button>
            <button class="del" onclick="del(${item.id})">Apagar Tarefa</button>
        </div>`
        return div
}
function boxNewTask (list) {
    let boxNewTasks = document.body.querySelector(`#task-creat-in`)
    let day = list.map( list => list.day)
    let lastDay = day[day.length-1]
    let month = list.map( list => list.month)
    let lastMonth = month[month.length-1]
    let year = list.map( list => list.year)
    let lastYear = year[year.length-1]
    if (lastDay == undefined){
        boxNewTasks.innerHTML = `Uau você concluiu todas as suas tarefas, meus parabéns. Agora que tal mais algumas?`
    }else {boxNewTasks.innerHTML = `Última tarefa criada: Dia ${lastDay} de ${lastMonth} do ano de ${lastYear}`}

}
function del (id) {
    SoundNotification()
    let res = confirm(`Deseja apagar esta tarefa?`)
    if (res == true){
    setTimeout(() => {delet(id)}, 5000)
    }
}
function delet (id) {
    let index = list.findIndex(i => i.id == id) 
    list.splice(index, 1)
    localStorage.setItem(`TaskList`, JSON.stringify(list))


    alterateDelTaskBox ({
        day: dayTask(),
        month: monthTask(),
        year: yearTask()
})
    document.getElementById(`${id}`).remove()
}

function alterateDelTaskBox (date) {
    delIn.splice(0, 1)
    delIn.push(date)
    localStorage.setItem(`DelIn`, JSON.stringify(delIn))
    delTaskBox(delIn)
}

function delTaskBox (delIn) {
    let boxDelTasks = document.querySelector(`#task-del-in`)
    boxDelTasks.innerHTML = `Última tarefa apagada: Dia ${delIn[0].day} de ${delIn[0].month} do ano de ${delIn[0].year}`
}
function end (id) {
    SoundNotification()
    let res = confirm(`Deseja finalizar esta tarefa?`)
    if (res == true){
    setTimeout(() => {ended(id)}, 5000)
    }
}
function ended (id) {
    let index = list.findIndex(i => i.id == id) 
    list.splice(index, 1)
    localStorage.setItem(`TaskList`, JSON.stringify(list))

    alterateEndTaskBox ({
        day: dayTask(),
        month: monthTask(),
        year: yearTask()
})

    document.getElementById(`${id}`).remove()
}

function alterateEndTaskBox (date) {
    endIn.splice(0, 1)
    endIn.push(date)
    localStorage.setItem(`EndIn`, JSON.stringify(endIn))
    endTaskBox(endIn)
}

function endTaskBox(endIn) {
    let boxEndTasks = document.querySelector(`#task-end-ind`)
    boxEndTasks.innerHTML = `Última tarefa Finalizada: Dia ${endIn[0].day} de ${endIn[0].month} do ano de ${endIn[0].year}`
}
function SoundNotification() {
let sound = new Audio (`/assets/notification.mp3`)
sound.play()
}
function verifyAtask (item) {
    let hour = hourTask()
    let hor = hour -= 6
    if (item.hour <= hour){
        item.stats = `Tarefa Antiga`
    }
}