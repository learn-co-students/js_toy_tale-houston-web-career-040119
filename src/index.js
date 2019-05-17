const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyBtn = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')
const likeToy = document.querySelector('.like-btn')

let allToyData = []
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

//Step 1-3
function getToys()
{
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((data) =>
  {
    allToyData = data
    data.forEach(toy =>{
      makeToyCard(toy)
    })
  })
}
getToys()

function makeToyCard(toy)
{
  toyCollection.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class='like-btn' data-id="${toy.id}">Like <3</button>
  </div>`
}
//Step 1-3

//Step 4

addToyBtn.addEventListener("submit",(e) =>
{
  e.preventDefault()
  fetch('http://localhost:3000/toys',
  {
   method: 'POST',
   headers: 
   { "Content-Type": "application/json", 
     Accept: "application/json"
   },
   body: JSON.stringify(
     {
     "name": e.target[0].value,
     "image": e.target[1].value,
     "likes": 0
     })
   })
   .then((res)=>{
    return res.json()})
   .then((toyObj)=>
   {
     e.target.reset()
     allToyData.push(toyObj)
     makeToyCard(toyObj)
   })
})

//Step 5

document.addEventListener('click', (e) =>
{  
  e.preventDefault()
  let oldLike = e.target.previousElementSibling
  let newLike = parseInt(oldLike.innerText) + 1
  if (e.target.classList.value === "like-btn")
  {
    let id = e.target.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, 
    {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json", 
        Accept: "application/json"
      },
      body: JSON.stringify(
      {
        "likes": newLike
      })})
      .then((res)=>{return res.json()})
      .then((obj) =>
      { 
        e.target.previousElementSibling.innerText = obj.likes
    
      })
   
  }
  
})










