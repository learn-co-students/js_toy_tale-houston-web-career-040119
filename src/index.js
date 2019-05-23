const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const baseURL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const addToyForm = document.querySelector(".add-toy-form")

addBtn.addEventListener('click', () => { 
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

fetch(baseURL)
.then((res)=> res.json())
.then((toys) => {
toys.forEach((toy) => renderToy(toy)) 

})

function renderToy(toy) {
  let div = document.createElement("div");
  div.setAttribute("class","card");

  let htag = document.createElement("h2");
  htag.innerText = toy.name;
  
  let img = document.createElement("img");
    img.setAttribute("src", toy.image);
    img.className = "toy-avatar";
  
    let ptag = document.createElement("p");
    ptag.innerText = `${toy.likes} Likes`;
    ptag.className = "like-btn";

    let btn = document.createElement("button");
 btn.setAttribute("class","like-btn")
  btn.dataset.id = toy.id 
  //btn.id = toy.id
  btn.dataset.likes = toy.likes
 btn.innerText = "Like <3"
 btn.addEventListener("click", (e) => {
   likes(e)

 })

 div.append(htag, img, ptag, btn)
 toyCollection.append(div)
}

addToyForm.addEventListener("submit", (e) => {
e.preventDefault()

let toyName = e.target.children[1].value;
let toyImage = e.target.children[3].value;

fetch( baseURL, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      "name": toyName,
      "image": toyImage,
      "likes": 0
    })
  })
  .then( (res) =>  res.json() )
  .then((toy) => {
//debugger
renderToy(toy)
  })
})


function likes(e) {
  e.preventDefault()
 
  let newLikes = parseInt(e.target.previousElementSibling.innerText) + 1 ;
  // debugger
  
  fetch(baseURL+`/${e.target.dataset.id}`,{
    method :"PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": newLikes
})
  })
  .then(() => { 
    e.target.previousElementSibling.innerText = `${newLikes} Likes`
  })
 } //after patch is done only likes is shown


/* <div class="card">
  <h2>Woody</h2>
  <img src=toy_image_url class="toy-avatar" />
  <p>4 Likes </p>
  <button class="like-btn">Like <3</button>
</div> */
