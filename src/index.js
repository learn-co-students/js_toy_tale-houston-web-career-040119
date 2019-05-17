document.addEventListener("DOMContentLoaded", function() {
let allToys = []
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((obj) => {
    allToys = obj
    collection.innerHTML = renderAllToys(allToys)
  });

addToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target[0].value,
      "image": e.target[1].value,
      "likes": 0
    })
  })
  .then((response) => response.json())
  .then((obj) => {
    addToyForm[0].value = ""
    addToyForm[1].value = ""
    let newToy = document.createElement('div')
    let newH2 = document.createElement('h2')
    let newImg = document.createElement('img')
    let newP = document.createElement('p')
    let button = document.createElement('button')
    button.classList = "like-btn"
    button.innerText = "Like <3"
    newP.innerText = obj.likes
    newImg.src = obj.image
    newImg.classList = "toy-avatar"
    newH2.innerText = obj.name
    newToy.classList = "card"
    newToy.append(newH2)
    newToy.append(newImg)
    newToy.append(newP)
    newToy.append(button)
    collection.append(newToy)
  })
})

document.addEventListener('click', (e) => {
  if (e.target.classList == 'like-btn') {
    e.target.parentElement.children[2].innerText ++
  }

})



});
