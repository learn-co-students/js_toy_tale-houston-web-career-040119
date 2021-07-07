const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let allToyData = []
const toycontainer = document.querySelector("#toy-collection")
const form = document.querySelector('.add-toy-form')
// YOUR CODE HERE



fetch("http://localhost:3000/toys")// or from the db.json???
.then((res)=>{return res.json()})
.then((data)=>{
allToyData = data
allToyData.forEach((toy) => {
  renderToy(toy)
})

})

function renderToy(toy){
  let div = document.createElement('div')
  div.setAttribute("class", "card")

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute("src", toy.image)
  img.setAttribute("class","toy-avatar")

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  let btn = document.createElement('button')
  btn.setAttribute("class",  "like-btn")
  btn.innerText = "Like <3"
  btn.dataset.id = toy.id
  btn.addEventListener('click', (e) => {
 likes(e)
})


  div.append(h2, img, p, btn)
  toycontainer.append(div)
}


addBtn.addEventListener('click', (b) => {
  // hide & seek with the form

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

form.addEventListener('submit',(e)=> {
e.preventDefault()
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
      // Accept: "application/json"  ASK ABOUT THIS!!
    },
     body: JSON.stringify({
       "name": e.target.name.value,
       "image":e.target.image.value,
       "likes": 0
     })

  })
  .then((res) => { return res.json()})

  .then((toyObject) => {

    let n_toy = renderToy(toyObject)
    toycontainer.append(n_toy)
  })
})

// let btn = document.createElement('button')
// btn.setAttribute("class",  "like-btn")

function likes(e){
e.preventDefault()

let more_likes = parseInt(e.target.previousElementSibling.innerText.split(" ")[0])+1
// debugger
  fetch(`http://localhost:3000/toys/${e.target.dataset.id}` , {
    method:"PATCH",
    headers:{
      'Content-Type': 'application/json'

    },
    body: JSON.stringify({
      "likes": more_likes //e.something.something or 0 and increment with function
    })
  })
  .then((res) => {return res.json()})
  .then((likeObj) => {
    e.target.previousElementSibling.innerText = `${more_likes}  Likes`

    //function here to increase like count???
  })
}













// OR HERE!
