
function getformvalue(event){
event.preventDefault();
const name=document.getElementById('name').value;
const email=document.getElementById('email').value;
const password=document.getElementById('pass').value;

let userdata={
    "name":name,
    "email":email,
    "password":password
}

axios.post("http://localhost:4000/expense/add-user", userdata)
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
}