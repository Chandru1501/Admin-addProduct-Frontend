var price = document.querySelector("#productprice");
var productname = document.querySelector("#productname");
var submit = document.querySelector("#btn");
var total = document.querySelector("#total");

var items = document.querySelector("#items");

window.addEventListener("DOMContentLoaded",showdetails);
submit.addEventListener("click",additems);
submit.addEventListener('click',()=>{
  setTimeout(()=>{
    location.reload();
  },600);
})


var totalvalue=0;



var myobj;

function additems(){

 myobj = {
    "productPrice" : parseInt(price.value),
    "productName" :  productname.value,
 }

addDetails(myobj);

}




function showoutputonscreen(myobj){
  
  // adding total while adding products

  console.log("myobj",myobj);
  
  totalvalue+=myobj.productPrice;
  total.textContent=totalvalue;
//console.log(myobj);

  mydata = {
    amount : myobj.productPrice,
    name : myobj.productName
  }

  //console.log(mydata);
  
  var tr = document.createElement("tr");
  
  for(item in mydata){
    var td = document.createElement('td');
    console.log(mydata[item]);
    td.textContent = mydata[item];
    tr.appendChild(td);
  }
  var deleteBtn = document.createElement('button');
  deleteBtn.className="btn btn-danger";
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.id="delete";
  
  tr.appendChild(deleteBtn)
  items.appendChild(tr);
  
  deleteBtn.onclick= (e)=>{
    if(confirm('Are You Sure can we delete that item ? ')){
      items.removeChild(tr);
      console.log("before deleting product value "+parseInt(myobj.productPrice) )
      console.log("before deleting totalvalue "+ totalvalue)
     // while subracting while deleting total
      totalvalue =totalvalue-parseInt(myobj.productPrice)
      total.textContent=totalvalue;
      deletething(myobj);
    }
 }
  
}


function addDetails(myobj){

 axios.post("http://localhost:1000/admin/add-product",myobj)
 .then((response)=>{
      console.log(response);
 })   
 .catch((err)=>{
    console.log(err);
  })
}

function deletething(myobj){
  console.log(myobj);
    axios.delete(`http://localhost:1000/admin/delete-product/${myobj.id}`)
    .then((response)=>{
          console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })
    
    console.log(myobj._id)
    }
    


function showdetails(){
 
  axios.get("http://localhost:1000/admin/get-products")
  .then((response)=> {
    if(response.data.length>0){
      items.style.visibility= "visible";
    }
    for(let i=0;i<response.data.length;i++){
      showoutputonscreen(response.data[i]);
    }
    console.log(response.data);

  })
  .catch((err)=>{
    console.log(err);
  })
}

