const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyFormForm = toyForm.querySelector("form");
let addToy = false
const toysURL = "http://localhost:3000/toys";

// YOUR CODE HERE

function renderToy(toyData) {
  let toyCollection = document.querySelector("#toy-collection");
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("data-id",`${toyData.id}`);
  cardDiv.className = "card";
  toyCollection.appendChild(cardDiv);

  let h2 = document.createElement("h2");
  h2.innerText = toyData.name;
  cardDiv.appendChild(h2);

  let img = document.createElement("img");
  img.setAttribute("src",toyData.image);
  img.className = "toy-avatar";
  cardDiv.appendChild(img);

  let p = document.createElement("p");
  p.innerText = `${toyData.likes} Likes `;
  cardDiv.appendChild(p);
  
  let button = document.createElement("button");
  button.className ="like-btn";
  button.innerText = "Like <3";
  cardDiv.appendChild(button);

  button.addEventListener( "click", function(e) {
    let id = parseInt(e.target.parentElement.getAttribute("data-id"));
    let likesElement = e.target.parentElement.querySelector("p");
    let likesCount = parseInt(likesElement.innerText.split(" ")[0]);
    likesCount += 1;
    fetch(`${toysURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
          "likes": likesCount
        }
      )
    }).then( res => res.json() )
    .then( function(data) {
      likesElement.innerText = `${likesCount} Likes `;
    });
  });
}

fetch(toysURL)
.then( res => res.json() )
.then( function(data) {
  data.forEach( toyData => renderToy(toyData) );
})


function createToy(toyName,imageURL) {
  fetch(toysURL, {
    method:"POST",
    headers: { "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(
      { "name": toyName,
        "image": imageURL,
        "likes":0
    })})
    .then( res => res.json() )
    .then( data => renderToy(data) );
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    if (!toyFormForm.getAttribute("data-has-event-listener")) {
      toyFormForm.addEventListener( "submit", function(e) {
        e.preventDefault();
        let toyName = toyFormForm.querySelectorAll("input")[0].value;
        let imageURL = toyFormForm.querySelectorAll("input")[1].value;
        createToy(toyName,imageURL);
        toyFormForm.reset();
        addToy = false;
        toyForm.style.display = "none";
      });
      toyFormForm.setAttribute("data-has-event-listener","true");
    }
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
