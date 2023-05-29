// js

// Access the list of toys from an API (mocked using JSON Server) 
// and render each of them in a "card" on the page
// Hook up a form that enables users to add new toys. Create an 
// event listener so that, when the form is submitted, the new toy
// is persisted to the database and a new card showing the toy is
// added to the DOM
// Create an event listener that gives users the ability to click 
// a button to "like" a toy. When the button is clicked, the number 
// of likes should be updated in the database and the updated 
// information should be rendered to the DOM

let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToy(toy)
    })
  })

  function renderToy(toy) {
    const toyCollection = document.querySelector("#toy-collection")
    const toyCard = document.createElement("div")
    toyCard.className = "card"
    toyCard.dataset.id = toy.id
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyCard)
  }

  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const toyName = event.target.name.value
    const toyImage = event.target.image.value
    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(newToy => {
      renderToy(newToy)
    })
  })

  const toyCollection = document.querySelector("#toy-collection")
  toyCollection.addEventListener("click", function(event) {
    if (event.target.matches(".like-btn")) {
      const toyCard = event.target.closest(".card")
      const toyId = toyCard.dataset.id
      const toyLikes = toyCard.querySelector("p")

      const newLikes = parseInt(toyLikes.textContent) + 1

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
      })
      .then(response => response.json())
      .then(updatedToy => {
        toyLikes.textContent = `${updatedToy.likes} Likes`
      })
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      const toyCard = document.createElement("div")
      toyCard.className = "card"
      toyCard.dataset.id = toy.id
      toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `
      toyCollection.append(toyCard)
    })
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})




// Path: db.json
// json
