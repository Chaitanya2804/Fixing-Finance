const menuButton = document.querySelector(".main-container nav .menu-button");
const closeButton = document.querySelector(".mobile-menu-items .close-btn");
const mainContainer = document.querySelector(".main-container");

menuButton.addEventListener("click", () => {
    mainContainer.classList.add("active");
});

closeButton.addEventListener("click" , () => {
    mainContainer.classList.remove("active");
});