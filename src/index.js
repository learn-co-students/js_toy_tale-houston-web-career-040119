document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const TOYS_URL = "http://localhost:3000/toys"
  let allToysData = []
  let addToy = false

  // YOUR CODE HERE

  fetch(TOYS_URL)
  .then(response => response.json())
  .then(toys => {
    allToysData = toys
    toyCollection.innerHTML = renderAllToys(allToysData)
    // allToyData.forEach(toy => renderSignleToy(toy)) if use the append method
  }) 

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

  toyForm.addEventListener('submit', function(e){
    e.preventDefault()
    let toyName = e.target.children[1].value
    let imageUrl = e.target.children[3].value
    fetch(TOYS_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: imageUrl,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(newToy => {
      e.target.reset()
      allToysData.push(newToy)
      toyCollection.innerHTML = renderAllToys(allToysData)
    })
  })

  toyCollection.addEventListener('click', function(e) {
    e.preventDefault()
    let toy = allToysData.filter(toy => toy.id == e.target.dataset.id)[0]
    let index = allToysData.indexOf(toy)
    if (e.target.dataset.action === 'add_likes') {
      fetch(`${TOYS_URL}/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: ++toy.likes //let a = 5, let b = a++, let c = ++a => b=5, a=6, c=6
        })
      })
      .then((response)=>{return response.json()})
      .then(obj=>{
        allToysData[index] = obj
        toyCollection.innerHTML = renderAllToys(allToysData)
      })
    }
    if(e.target.dataset.action === 'delete_toy') {
      fetch(`${TOYS_URL}/${toy.id}`,{
        method: 'delete'
      }).then(()=>{
        allToysData.splice(index, 1)
        //let allToysData = allToysData.filter(toy => {toy.id != e.target.dataset.id})
        toyCollection.innerHTML = renderAllToys(allToysData)
      })
    }
  })
  
  function renderSingleToy (toy) {
    return (`
    <div class="card">
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}">
      <p>${toy.likes} Likes</p>
      <div>
        <button data-id="${toy.id}" data-action="add_likes" class="like-btn">Like <3</button>
        <button data-id="${toy.id}" data-action="delete_toy" class="toy-delete-button">Delete</button>
      </div>
    </div>
    `)
  }

  function renderAllToys(toysArray) {
    return toysArray.map(renderSingleToy).join('')
  }

})


// OR HERE!
