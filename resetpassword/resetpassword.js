

function getresetvalue(e){
    e.preventDefault();
   const email=document.getElementById('email').value;
    console.log(email);

    axios.post('http://localhost:4000/called/reset-password',{
        email:email
    }).then((res)=>{
        console.log('sucess')
    }).catch(err=>{
        console.log(err);
    })
}