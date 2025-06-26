let showForm = false;

document.addEventListener("DOMContentLoaded", () => {
  const toggleFormBtn = document.querySelector("#toggleFormBtn");
  const formContainer = document.querySelector(".container");
  const artCollection = document.getElementById("artCollection");

  // Get modal elements from HTML
  const modal = document.getElementById("artModal");
  const closeModalBtn = document.getElementById("closeModal");

  // Close modal function
  function closeModal() {
    modal.style.display = "none";
  }

  // Close modal on button click
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Toggle form display
  toggleFormBtn.addEventListener("click", () => {
    showForm = !showForm;
    formContainer.style.display = showForm ? "block" : "none";
  });

  // Fetch artworks and render
  fetch("https://phase-1-project-wuya.onrender.com/artworks")
    .then((res) => res.json())
    .then((artworks) => {
      artworks.forEach(renderArtwork);
    })
    .catch((err) => console.error("Failed to fetch artworks:", err));

  // Submit new artwork
  const artForm = document.querySelector(".addArtForm");
  artForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const artist = e.target.artist.value.trim();
    const image = e.target.image.value.trim();
    const description = e.target.description.value.trim();

    if (!title || !artist || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const newArt = { title, artist, image, description, likes: 0 };

    fetch("https://phase-1-project-wuya.onrender.com/artworks", {
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

  // Render a single artwork card
  function renderArtwork(art) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <h2>${art.title}</h2>
      <h4>by ${art.artist}</h4>
      <img src="${art.image}" alt="${art.title}" />
      <p>${art.description}</p>
      <p><strong>${art.likes}</strong> Likes</p>
      <button class="likeBtn" id="art-${art.id}">Like ❤️</button>
    `;

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

    // Like button logic
    const likeBtn = card.querySelector(".likeBtn");
    likeBtn.addEventListener("click", () => {
      const newLikes = art.likes + 1;

      fetch(`https://phase-1-project-wuya.onrender.com/artworks${art.id}`, {
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
        .catch((err) => console.error("Error updating likes:", err));
    });

    artCollection.appendChild(card);
  }
});



















































