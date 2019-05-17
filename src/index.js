const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const addToyForm = document.querySelector(".add-toy-form")
    addToyForm.addEventListener('submit',(e) => {
      e.preventDefault()
      let toy = e.target.children
      let toyName = toy[1].value
      let toyImage = toy[3].value
      addNewToy(toyName,toyImage)
      e.target.reset()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('click', (e) => {
  if (e.target.classList.value == "like-btn"){
    let toyID = e.target.dataset.toyId
    let likes = parseInt(document.querySelector(`#toy-${toyID}-likes`).innerText.split(" ")[0])
    likeToy(toyID,(likes+1))
  }
})

// OR HERE!

const TOYS_URL = "http://localhost:3000/toys"

fetch(TOYS_URL)
  .then((response) => {return response.json()})
  .then((data) => {
    let toyCollection = document.querySelector("#toy-collection")
    data.forEach((toy)=>{
      toyCollection.append(createCard(toy))
    })
  })

function addNewToy(toyName,toyImage){
  fetch(TOYS_URL,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
      },
    body: JSON.stringify({
      "name": toyName,
      "image": toyImage,
      "likes": 0
      })
    })
    .then((response) => {return response.json()})
    .then((toy) => {
      let toyCollection = document.querySelector("#toy-collection")
      toyCollection.append(createCard(toy))
    })
}

function likeToy(toyID,newLikes){
  fetch(`${TOYS_URL}/${toyID}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({
      "likes":newLikes
    })
  })
    .then((response) => {return response.json()})
    .then((toy)=>{
      let existingToy = document.querySelector(`#toy-${toyID}-likes`)
      existingToy.innerHTML = `${toy.likes} Likes `
    })
}
