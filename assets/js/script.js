const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objstr = localStorage.getItem('users');

if(objstr != null){
    userArray = JSON.parse(objstr)
}

DisplayInfo();
addUserBtn.onclick = () => {
    const name = usernameTextField.value;
    if(!name){
        // edit
        // userArray.splice(edit_id,1,{'name': name})
        // edit_id = null;
        alert("Please enter the data field!")
    }
    else if(edit_id != null){
        userArray.splice(edit_id, 1, {'name': name})
        edit_id = null;
    }
    else{
        // insert
        userArray.push({'name' : name});
    }

    SaveInfo(userArray)
    usernameTextField.value = '';
    
    addUserBtn.innerText = btnText;
}

function SaveInfo(userArray){
    let str = JSON.stringify(userArray)
    localStorage.setItem('users',str)
    DisplayInfo();
}

function DisplayInfo(){
    let statement = '';
    userArray.forEach((user,i)=>{
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa-regular fa-pen-to-square btn-info mx-2" onclick = 'EditInfo(${i})'></i> <i class="btn text-white btn-danger fa-solid fa-trash" onclick = 'DeleteInfo(${i})'></i></td>
    </tr>`
    });
    recordsDisplay.innerHTML = statement;
}

function EditInfo(id){
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save Changes'
}

function DeleteInfo(id){
    userArray.splice(id,1);
    SaveInfo(userArray);
    
}