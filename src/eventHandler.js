

function renderAllToys(toys) {
  return toys.map(renderSingleToy).join('')

}

function renderSingleToy(toy) {
  return (`
  <div class="card">
    <h2 >${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}">
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>
  </div>`)
}
