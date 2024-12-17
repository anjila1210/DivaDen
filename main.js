

const formOpenBtn = document.querySelector(".sign-in-btn"), 
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

if (formOpenBtn) {
  formOpenBtn.addEventListener("click", () => {
    home.classList.add("show");
  });
}

if (formCloseBtn) {
  formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
  });
}

signupBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

  

const productContainer = document.querySelector('.product-container');
const preBtn = document.querySelector('.pre-btn');
const nxtBtn = document.querySelector('.nxt-btn');

// Function to check scroll position and toggle arrows
function checkArrows() {
    const maxScrollLeft = productContainer.scrollWidth - productContainer.clientWidth;

    preBtn.style.display = productContainer.scrollLeft > 0 ? 'flex' : 'none'; // Show left arrow if not at start
    nxtBtn.style.display = productContainer.scrollLeft < maxScrollLeft ? 'flex' : 'none'; // Show right arrow if not at end
}

// Initially check arrow visibility
checkArrows();

// Scroll Left Button
preBtn.addEventListener('click', () => {
    productContainer.scrollLeft -= productContainer.clientWidth; // Scroll one page left
    setTimeout(checkArrows, 500); // Check arrows after scrolling
});

// Scroll Right Button
nxtBtn.addEventListener('click', () => {
    productContainer.scrollLeft += productContainer.clientWidth; // Scroll one page right
    setTimeout(checkArrows, 500); // Check arrows after scrolling
});

// Listen for scroll events to toggle arrows dynamically
productContainer.addEventListener('scroll', checkArrows);



const picturesContainer = document.querySelector('.pictures-container');
const firstBtn = document.querySelector('.first-btn');
const secondBtn = document.querySelector('.second-btn');
function Arrows() {
    const maxScrollLeft = picturesContainer.scrollWidth - picturesContainer.clientWidth;

    firstBtn.style.display = picturesContainer.scrollLeft > 0 ? 'flex' : 'none'; 
    secondBtn.style.display = picturesContainer.scrollLeft < maxScrollLeft ? 'flex' : 'none'; 
}

Arrows();

firstBtn.addEventListener('click', () => {
    picturesContainer.scrollLeft -= picturesContainer.clientWidth; // Scroll one page left
    setTimeout(Arrows, 500); // Check arrows after scrolling
});

// Scroll Right Button
secondBtn.addEventListener('click', () => {
    picturesContainer.scrollLeft += picturesContainer.clientWidth; // Scroll one page right
    setTimeout(Arrows, 500); // Check arrows after scrolling
});

// Listen for scroll events to toggle arrows dynamically
picturesContainer.addEventListener('scroll', Arrows);
