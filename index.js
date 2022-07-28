// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯
//preventdefault prevents the page from reloading when a form is submitted
// 



function getFormattedTime(){

  const now = new Date().toLocaleTimeString('en-us',{
       month: 'short',
       day: 'numeric',
       hour:'2-digit',
       minute: '2-digit',
  }); 
  
  const date = now.split(',')[0].split(' ');
  const time = now.split(',')[1];
  return `${date[1]} ${date[0]},${time} `;
   
}

//25 Feb, 06:45 PM
document.querySelector('#ewallet-form').addEventListener('submit',function(e) {
  e.preventDefault()  
  // console.log('submit successful') //used to check if the preventdefault worked

//the below code makes the inputed values readable
 const type =  document.querySelector(".add__type").value
 const description  = document.querySelector(".add__description").value
 const value = document.querySelector(".add__value").value
 //console.log(type,description,value) //used to check if the three lines of codes above works
if (description.length > 0 && value.length > 0) {
newItem(type,description,value);
getFormattedTime()
resetForm();
} 

//the code above is used to pass the value of newHtml to be displayed by its parent element using the parent class name 
//thus anytime data is passed into the formfields and submitted,it will be logged and displayed in the panel below the formfield
//as a new entry
//the ternary operator on line 22 is used to make expenses(with - data type) red while income(with + type)green
//the fonction(resetform) on line 43 and called on line 33 is used to reset the formfields after data is submitted
})

//first you work on the input and submission aspect of the page
showItems()
function showItems() {
  let items = getItemsFromLS()

  const collection = document.querySelector('.collection')
 

  for (let item of items) {
     const newHtml = `<div class="item">
  <div class="item-description-time">
    <div class="item-description">
      <p>${item.description}</p>
    </div>
    <div class="item-time">
      <p>25${item.time}</p>
    </div>
  </div>
  <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}"> 
  
    <p>${item.type}$${sep(item.value)}</p>
  </div>
  </div>`;
  collection.insertAdjacentHTML("afterbegin",newHtml)  
  }
}




function newItem(type,description,value) {
const time = getFormattedTime()

  const newHtml = `<div class="item">
  <div class="item-description-time">
    <div class="item-description">
      <p>${description}</p>
    </div>
    <div class="item-time">
      <p>25${time}</p>
    </div>
  </div>
  <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}"> 
  
    <p>${type}$${sep(value)}</p>
  </div>
  </div>`
  //
  //the section above is used to make sure that
  console.log(newHtml)
  const collection = document.querySelector('.collection')
  collection.insertAdjacentHTML("afterbegin",newHtml)  

  addItemToLS(type,description,value,time)
  showTotalIncome()
  showTotalExpense()
  showTotalBalance()
}


function resetForm() {
  
  document.querySelector(".add__type").value = '+'
  document.querySelector(".add__description").value = ''
  document.querySelector(".add__value").value = ''

}
//the below function is used to access the data stored in the local storage
function getItemsFromLS() {
  
  let items = localStorage.getItem('items')
  if(items) {
 items = JSON.parse(items)
  } else {
    items = []
  } 
  return items
}


showTotalIncome()

function showTotalIncome() {
  let items = getItemsFromLS()
  let totalIncome = 0
  for(item of items){
if(item.type === "+"){
  totalIncome += parseInt(item.value)
}
document.querySelector('.income__amount p').innerText =`$${sep(totalIncome)}`
console.log(totalIncome)
  }}


  
  showTotalExpense()
function showTotalExpense() {
  let items = getItemsFromLS()
let totalExpense = 0
for (const item of items) {
  if (item.type === "-") {
    totalExpense += parseInt(item.value) 
  }
  document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`
  console.log(totalExpense)
}}

showTotalBalance()
function showTotalBalance() {
  let items = getItemsFromLS()
let balance = 0
  for (const item of items) {
    if (item.type === "+") {
      balance += parseInt(item.value) 
    }else{balance -= parseInt(item.value) }

    document.querySelector('.balance__amount p').innerText = sep(balance);

    // if (balance >= 0){document.querySelector('header').className = 'green'}
    // else{document.querySelector('header').className = 'red'}


    document.querySelector('header').className =  (balance >= 0) ? 'green' : 'red'
  }
}

function sep(amount) {
  parseInt(amount)
  return amount.toLocaleString()
  
}

function addItemToLS(type,description,value,time) {
 let items = getItemsFromLS() //this function will be called into any function that is writtn to work with data stored in the local storage
 items.push({description, type, value, time})
 localStorage.setItem('items', JSON.stringify(items))
}



//for loops are used to display data under certain conditions 
