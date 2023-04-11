const pbtn=document.getElementById('premiumbtn');
const token=localStorage.getItem("token");

function getformvalue(event){
    event.preventDefault();
    const amount=document.getElementById('amount').value;
    const description=document.getElementById('description').value;
    const category=document.getElementById('cat').value;
    let expense_detail={
        "amount":amount,
        "description":description,
        "category":category
    }
axios.post('http://localhost:4000/user/add-expense',expense_detail,{headers:{'Authorization':token}})
    .then((response)=>{
        console.log('expense added');
        showscreen(expense_detail);
    }).catch((err)=>{
        console.log(err);
    })
}


axios.get('http://localhost:4000/user/get-expense',{headers:{'Authorization':token}})
.then((response)=>{
    console.log("fetched exepnse");
    for(let i=0;i<response.data.length;i++)
    {
        showscreen(response.data[i]);
    }
})


function showscreen(data){
    const ul=document.getElementById('list-item');
    const li=document.createElement('li');
    li.id='lists';
    const dltbtn = document.createElement("input");
    dltbtn.class = "btn-check";
    dltbtn.type = "button";
    dltbtn.value = "Delete-product";   
    li.textContent=data.amount+"-"+"-"+data.description+"-"+data.category;
    li.appendChild(dltbtn);
    ul.appendChild(li);
dltbtn.onclick=()=>{
    axios.delete(`http://localhost:4000/user/delete-expense/${data.id}`,{headers:{'Authorization':token}})
    .then((result)=>{
        console.log("deleted");
        ul.removeChild(li);
    }).catch(err=>console.log(err));
}
}

pbtn.onclick=async(e)=>{
    e.preventDefault();
const response=await axios.get('http://localhost:4000/premium/purchase-premium',{headers:{"Authorization":token}});
let options={
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler":async function(response){
        await axios.post('http://localhost:4000/premium/update-transaction',{
           order_id:options.order_id,
           payment_id:response.razorpay_payment_id
        },{headers:{"Authorization":token}})

        alert('you are a premium user now')
    }

}
const rpz1=new Razorpay(options)
rpz1.open();


rpz1.on('payment.failed',function (response){
    alert('something went wrong');
})
}
