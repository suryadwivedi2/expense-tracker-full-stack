const pbtn = document.getElementById('premiumbtn');
const lbtn = document.getElementById('leaderboard-btn');
const token = localStorage.getItem("token");
const divp = document.getElementById('premium');


function getformvalue(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('cat').value;
    let expense_detail = {
        "amount": amount,
        "description": description,
        "category": category
    }
    axios.post('http://localhost:4000/user/add-expense', expense_detail, { headers: { 'Authorization': token } })
        .then((response) => {
            console.log('expense added');
            showscreen(expense_detail);
        }).catch((err) => {
            console.log(err);
        })
}


function premiumuser() {
    pbtn.remove();
    divp.innerHTML = "<h6>YOU ARE A PREMIUM USER</h6>";
}



function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


const decodedtoken = parseJwt(token);


window.addEventListener('DOMContentLoaded', () => {
    if (decodedtoken.ispremium == true) {
        premiumuser();
        showleaderboard();
    }
    axios.get('http://localhost:4000/user/get-expense', { headers: { 'Authorization': token } })
        .then((response) => {
            console.log("fetched exepnse");
            for (let i = 0; i < response.data.length; i++) {
                showscreen(response.data[i]);
            }
        })

    function showleaderboard() {
        const lbtn = document.getElementById("board-btn");
        const inputElement = document.createElement('input');
        inputElement.type = "button";
        inputElement.value = "show Leaderboard";
        lbtn.appendChild(inputElement);
     inputElement.onclick=async()=>{
        const token=localStorage.getItem('token');
    const leaderboardarray= await axios.get('http://localhost:4000/premium/show-leaderboard',{ headers: {'Authorization':token}})
   // console.log(leaderboardarray); 
    let leaderboardelement=document.getElementById('leaderboard');
     leaderboardelement.innerHTML='<h1>Leaderboard</h1>';
    leaderboardarray.data.forEach(userdetails => {
        leaderboardelement.innerHTML+=`<li>name-${userdetails.name} Total expense-${userdetails.totalexpense}`
        
    });
}
    }
})




function showscreen(data) {
    const ul = document.getElementById('list-item');
    const li = document.createElement('li');
    li.id = 'lists';
    const dltbtn = document.createElement("input");
    dltbtn.class = "btn-check";
    dltbtn.type = "button";
    dltbtn.value = "Delete-product";
    li.textContent = data.amount + "-" + "-" + data.description + "-" + data.category;
    li.appendChild(dltbtn);
    ul.appendChild(li);
    dltbtn.onclick = () => {
        axios.delete(`http://localhost:4000/user/delete-expense/${data.id}`,{ headers: { 'Authorization': token }},{amount:data.amount})
            .then((result) => {
                console.log("deleted");
                ul.removeChild(li);
            }).catch(err => console.log(err));
    }
}

pbtn.onclick = async (e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:4000/premium/purchase-premium', { headers: { "Authorization": token } });
    let options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            const res = await axios.post('http://localhost:4000/premium/update-transaction', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })
            localStorage.setItem("token", res.data.token);
            //console.log(res.data.token);
            alert('congratulation on  buying our premium services')
            premiumuser();
            //showleaderboard();
        }
    }
    const rpz1 = new Razorpay(options)
    rpz1.open();


    rpz1.on('payment.failed', async function (response) {
        await axios.post('http://localhost:4000/premium/update-transaction', {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id
        }, { headers: { "Authorization": token } })

        alert('something went wrong');
    })
}


document.getElementById('forgot-password').onclick=()=>{
window.location.href='../resetpassword/resetpass.html'
}





