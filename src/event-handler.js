function createCard(toy){
  //create the div element with a class of card
  let div = document.createElement('div')
  div.setAttribute('class','card')
  //set up the h2 tag with the toy name
  let h2 = document.createElement('h1')
  h2.innerText = toy.name
  //set up the image tag with the image url and the class of "toy-avatar"
  let img = document.createElement('img')
  img.setAttribute('class','toy-avatar')
  img.setAttribute('src',toy.image)
  //set up the p tag with the toy's likes including an id for "Toy-ID-likes"
  let p = document.createElement('p')
  p.setAttribute('id',`toy-${toy.id}-likes`)
  p.innerText = `${toy.likes} Likes `
  //set up like button with a class of "like-btn", data-toy-id, and text of "Like <3"
  let button = document.createElement('button')
  button.setAttribute('class','like-btn')
  button.setAttribute('data-toy-id',toy.id)
  button.innerText = "Like <3"
  // append all of the above to the div tag
  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(button)
  return div
}
