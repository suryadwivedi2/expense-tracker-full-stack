

function getresetvalue(e){
    e.preventDefault();
   const email=document.getElementById('email').value;
    localStorage.setItem('email',email)
    axios.post('http://13.48.78.68:4000/called/forgot-password',{
        email:email
    }).then((res)=>{
        console.log('sucess')
    }).catch(err=>{
        console.log(err);
    })
}