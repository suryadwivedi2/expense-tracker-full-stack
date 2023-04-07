

async function getformvalue(event){
    event.preventDefault();
    
    
    try{
    const email=document.getElementById('email').value;
    const password=document.getElementById('pass').value;
    let userdata={
        "email":email,
        "password":password
    }
    
    const res=await axios.post("http://localhost:4000/expense/login-user", userdata)
                    if(res.status==201){
                    window.location.href='login.html';
                }else{
                    throw new Error('please match email id or password');
                }
            }catch(err){
                document.body.innerHTML+=`<div style="color:red;">${'please match email id or password'}</div>`;
            }
    }