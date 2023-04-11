

async function getformvalue(event){
    event.preventDefault();
    try{
    const email=document.getElementById('email').value;
    const password=document.getElementById('pass').value;
    let userdata={
        "email":email,
        "password":password
    }
    
    const res=await axios.post("http://localhost:4000/expense/login-user", userdata);
                    if(res.status==201 && res.data.ispremium==true){
                      //  console.log(res.data.);
              localStorage.setItem('token',res.data.token)
              window.location.href='../expense page/expense_page_premium.html';          
                    alert('login successfull');
                }else if(res.status==201 && res.data.ispremium==false){
                    localStorage.setItem('token',res.data.token)
                    window.location.href='../expense page/expense_page.html';
                    alert('login successfull');
                }
                else{
                    throw new Error('user not authorized');
                }
            }catch(err){
                document.body.innerHTML+='<div style="color:red;">user not authorized</div>';
            }
        }
        function redirect(event){
             event.preventDefault();
             window.location.href='../signup/expense_tracker.html';
         }
