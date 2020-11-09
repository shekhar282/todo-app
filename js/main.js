showTask();
const addtaskinput = document.querySelector('#addtaskinput');
const addtaskbtn = document.querySelector('#addtaskbtn');
const savetaskbtn = document.querySelector('#savetaskbtn');
const saveIndex = document.querySelector('#saveindex');
const deleteallbtn = document.querySelector('#deleteallbtn');
const searchtextbox = document.querySelector('#searchtextbox');

addtaskinput.value=''
addtaskbtn.addEventListener('click', () => {
    if (addtaskinput.value.trim() !== '') {
        let taskobj = getItems();;
        taskobj.push(addtaskinput.value);
        localStorage.setItem('localtask', JSON.stringify(taskobj));
    }
    addtaskinput.value='';  
    showTask()
});


function showTask() {
    let taskobj=getItems();
    let html = '';
    let addTaskList = document.querySelector('#addedtasklist');
    taskobj.forEach((item, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item}</td>
                    <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    })
    addTaskList.innerHTML = html;
}


// EDIT TASK
function edittask(index){
    saveindex.value=index;
    let taskobj = getItems();
    addtaskinput.value = taskobj[index];
    addtaskbtn.classList.add('hidden')
    savetaskbtn.classList.remove('hidden');
}


// SAVE TASK
savetaskbtn.addEventListener('click',()=>{
    let taskobj = getItems();
    taskobj[saveIndex.value] = addtaskinput.value;
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showTask();
    addtaskbtn.classList.remove('hidden');
    savetaskbtn.classList.add('hidden'); 
    addtaskinput.value='';   
})

// DELETE
function deleteitem(index){
    let taskobj = getItems();
    taskobj.splice(index,1);
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showTask() ;
}

deleteallbtn.addEventListener('click',()=>{
    let taskobj=[]
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showTask() ;
    addtaskbtn.classList.remove('hidden');
    savetaskbtn.classList.add('hidden');
    addtaskinput.value='';
})


// GET ITEMS from Local Storage
function getItems(){
    let localtask = localStorage.getItem('localtask');
        let tasks;
        if (localtask) {
            tasks = JSON.parse(localtask);
        }
        else {
            tasks = []
        }
        return tasks;
}