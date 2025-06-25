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



















































})