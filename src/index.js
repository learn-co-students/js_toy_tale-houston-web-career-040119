const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyLink = 'http://localhost:3000/toys'
let addToy = false
var createButton = document.querySelectorAll("input")[2]
var test = `${toyLink}/1`

// createButton.addEventListener("click", function(e){
//   e.preventDefault();
// });

// YOUR CODE HERE

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

document.addEventListener('DOMContentLoaded', () =>{

  fetch(toyLink)
    .then((resp) => resp.json())
    .then((toyJson) => {
      renderToy(toyJson)
    })
    function renderToy(toyJson){
      toyJson.forEach((object) => toyBuilder(object))
    }
})

function toyBuilder(object){
  var likeToy = document.createElement('button')
  var collectionDiv = document.querySelector(`#toy-collection`)
  var toyDiv = document.createElement('div')
  var toyImg = document.createElement('img')
  var toyLikes = document.createElement('p')
  var htag = document.createElement('h2')
  likeToy.dataset.id = "like"
  likeToy.innerText = "Like 🧸"
  // likeToy.dataset.toyId = object.id
  toyLikes.innerText = `${object.likes} likes!` 
  toyImg.src = object.image
  toyImg.classList.add("toy-avatar")
  toyDiv.classList.add("card")
  htag.innerText = object.name
  toyDiv.append(htag)
  toyDiv.append(toyImg)
  toyDiv.append(toyLikes)
  toyDiv.append(likeToy)
  collectionDiv.append(toyDiv)
}



//this is the liking button event listener. Pay no mind as it is not done yet
// //jussayin

// document.addEventListener('click', (e) => {
//   if (e.target.classList == 'like') {
//     debugger
//     e.target.parentElement.children[2].innerText ++
//   } 
// })
document.addEventListener("click", function(e){
  // console.log(e.target)
  // let targetid = getObjectById(e)
  // debugger
  if (e.target.classList[0] == "like"){
    console.log("this should like the toy, but I cannot find what I need to find on google to impliment this function yet")
    console.log(e.target.dataset.toyId)
    num = parseInt(e.target.previousElementSibling.innerText.split(" ")[0])
    let toyId = e.target.dataset.toyId
    fetch(`${toyLink}/${toyId}`,{
      method: "PATCH",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "likes": num + 1
      })
    })
  }



});


createButton.addEventListener("click", function(e){
  e.preventDefault();
  let newName = document.querySelectorAll("input")[0].value
  let newUrl = document.querySelectorAll("input")[1].value
  console.log(newName, newUrl)
  // debugger
  fetch(toyLink, {
    method: "POST",
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "name": newName,
      "image": newUrl,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toyJson =>{
    toyBuilder(toyJson)
  })
  newName.value =  " "
  newUrl.value = " "
})






// OR HERE!
