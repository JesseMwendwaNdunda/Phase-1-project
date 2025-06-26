let showForm = false;

document.addEventListener("DOMContentLoaded", () =>{
    const toggleFormBtn = document.querySelector("#toggleFormBtn")
    const formContainer = document.getElementsByClassName("container")
    const artCollection = document.getElementById("artCollection")

    //Getting the modal elements from the HTML file
    const modal = document.getElementById("artModal")
    const closeModalBtn = document.getElementById("closeModal")

    //The function for Close modal
    function closeModal(){
        modal.style.display ="none"
    }

    //on button click for close modal
    closeModalBtn.addEventListener("click",closeModal)

    modal.addEventListener("click",(e)=>{
        if(e.target ===modal){
            closeModal()
        }
    })

    //toggling the form display
    toggleFormBtn.addEventListener("click",()=>{
        showForm =! showForm
        formContainer.style.display =showForm? "block" :"none"
    })

    //fetch artworks and render the artworks
    fetch("http://localhost:3000/artworks")
    .then((res)=>res.json)
    .then((artworks)=>{
        artworks.forEach(renderArtwork)
    })
    .catch((err)=>console.error("Failed to fetch desired artworks:",err))

    //submiting new art
    const artForm = document.getElementsByClassName("addArtForm")
    artForm.addEventListener("submit", (e)=>{
        e.preventDefault()
    })

    const title=e.target.title.value.trim()
    const artist =e.target.artist.value.trim()
    const image = e.target.description.value.trim()

    if (!title || !artist || !image){
        alert("PLease fill out your art on all the required fields.")
        return
    }

    const newArt = {title, artist,image,description,likes:0}

    fetch("http://localhost:3000/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newArt),
    })
      .then((res) => res.json())
      .then((art) => {
        renderArtwork(art);
        artForm.reset();
      })
      .catch((err) => console.error("Error submitting artwork:", err));
    });

    //render a single artwork card
    function renderArtwork(art){
        const card=document.createElement("div")
        card.className = "card"
        card.style.cursor="pointer"

        card.innerHTML =`
         <h2>${art.title}</h2>
         <h4>by ${art.artist}</h4>
         <img src="${art.image}" alt="${art.title}" />
         <p>${art.description}</p>
         <p><strong>${art.likes}</strong> Likes</p>
         <button class="likeBtn" id="art-${art.id}">Like ❤️</button>`
    }

    // Open modal with artwork details
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("likeBtn")) return;

      document.getElementById("modalTitle").textContent = art.title;
      document.getElementById("modalArtist").textContent = `by ${art.artist}`;
      const modalImage = document.getElementById("modalImage");
      modalImage.src = art.image;
      modalImage.alt = art.title;
      document.getElementById("modalDescription").textContent = art.description;
      document.getElementById("modalLikes").textContent = art.likes;

      modal.style.display = "flex";
    });

    // Making my like button functional
    const likeBtn = card.querySelector(".likeBtn");
    likeBtn.addEventListener("click", () => {
      const newLikes = art.likes + 1;

      fetch(`http://localhost:3000/artworks/${art.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: newLikes }),
      })
        .then((res) => res.json())
        .then((updatedArt) => {
           art.likes = updatedArt.likes;
           card.querySelector("p strong").textContent = updatedArt.likes;
        })



















































})