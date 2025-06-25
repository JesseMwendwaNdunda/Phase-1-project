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



















































})