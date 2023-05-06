window.addEventListener("scroll", function () {
  let navBar = document.getElementById("navbar_top");
  if (window.scrollY > 0) {
    navBar.classList.add("fixed-top");
    navBar.classList.add("navbar_top");
    navBar.classList.add("header");
  } else {
    navBar.classList.remove("fixed-top");
    navBar.classList.remove("navbar_top");
    navBar.classList.remove("header");
  }
});

// script for slider in the hero section *****************************************
var slides = document.querySelectorAll(".slide");
var currentSlide = 0;
var interval = 5000;

function nextSlide() {
  if (slides && slides.length > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }
}

function startSlider() {
  setInterval(nextSlide, interval);
}

startSlider();

// ***************************************************************
// script for video popup *****************************************
const videoContainer = document.querySelector(".video-container");

let btn1Query = document.getElementById("videolink1");

if (btn1Query && btn1Query.addEventListener) {
  btn1Query.addEventListener("click", function () {
    videoContainer.classList.add("show");
  });
}

let btn2Query = document.getElementById("videolink2");

if (btn2Query && btn1Query.addEventListener) {
  btn2Query.addEventListener("click", function () {
    videoContainer.classList.add("show");
  });
}

let btn3Query = document.getElementById("videolink3");

if (btn3Query && btn1Query.addEventListener) {
  btn3Query.addEventListener("click", function () {
    videoContainer.classList.add("show");
  });
}
const close = document.querySelector(".close");

if (close && videoContainer) {
  close.addEventListener("click", function () {
    videoContainer.classList.remove("show");
  });
}
// Script for menu popup**********************************************
const menuContainer = document.querySelector(".menu");
const btnOpen = document.getElementById("menuOpen");

if (menuContainer && btnOpen) {
  btnOpen.addEventListener("click", function () {
    menuContainer.classList.remove("hide");
  });
}

// Query Two
const btnClose = document.querySelector(".btnClose");

if (menuContainer && btnClose) {
  btnClose.addEventListener("click", function () {
    menuContainer.classList.add("hide");
  });
}
// Query Three
const slideMenuOpen = document.getElementById("slideMenuOpen");

if (menuContainer && slideMenuOpen) {
  slideMenuOpen.addEventListener("click", function () {
    menuContainer.classList.remove("hide");
  });
}
// Query Four
const slideMenuOpen1 = document.getElementById("slideMenuOpen1");

if (menuContainer && slideMenuOpen1) {
  slideMenuOpen1.addEventListener("click", function () {
    menuContainer.classList.remove("hide");
  });
}
// Query Five
const slideMenuOpen2 = document.getElementById("slideMenuOpen2");

if (menuContainer && slideMenuOpen2) {
  slideMenuOpen2.addEventListener("click", function () {
    menuContainer.classList.remove("hide");
  });
}
// ***************************************************************

// News section carousel script ****************************************************
const wrapper = document.querySelector(".wrapper");
const carouselSlide = document.querySelector(".carousel-slide");
const arrowBtn = document.querySelectorAll(".wrapper i");
const dots = document.querySelectorAll(".dot");
const card = carouselSlide.querySelector(".card");
const firstCardWidth = card ? card.offsetWidth : "";
// const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carouselSlide.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carouselSlide.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouselSlide.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carouselSlide.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselSlide.scrollLeft =
      btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const activeDot = document.querySelector(".active");
    activeDot.classList.remove("active");
    dot.classList.add("active");

    // Calculate the scroll position of the active card
    const cardIndex = index + cardPerView;
    const scrollPos = cardIndex * firstCardWidth;
    carouselSlide.scrollLeft = scrollPos;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carouselSlide.classList.add("dragging");
  // Record the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carouselSlide.scrollLetf;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Update the scroll position of the carousel based on the cursor movement
  carouselSlide.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carouselSlide.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 0) return;
  timeoutId = setTimeout(() => {
    carouselSlide.scrollLeft += firstCardWidth;

    // Calculate the index of the active card
    let activeIndex =
      Math.round(carouselSlide.scrollLeft / firstCardWidth) - cardPerView;
    if (activeIndex < 0) activeIndex = dots.length - 1;
    else if (activeIndex >= dots.length) activeIndex = 0;

    // Update the active class of the dot button
    const activeDot = document.querySelector(".active");
    // activeDot.classList.remove("active");
    if (activeDot !== null) {
      activeDot.classList.remove("active");
    }
    // dots[activeIndex].classList.add("active");
    if (dots[activeIndex]) {
      dots[activeIndex].classList.add("active");
    }
  }, 2500);
};

autoPlay();

const infiniteScroll = () => {
  if (carouselSlide.scrollLeft === 0) {
    carouselSlide.classList.add("no-transition");
    carouselSlide.scrollLeft =
      carouselSlide.scrollWidth - 2 * carouselSlide.offsetWidth;
    carouselSlide.classList.remove("no-transition");
  } else if (
    Math.ceil(carouselSlide.scrollLeft) ===
    carouselSlide.scrollWidth - carouselSlide.offsetWidth
  ) {
    carouselSlide.classList.add("no-transition");
    carouselSlide.scrollLeft = carouselSlide.offsetWidth;
    carouselSlide.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carouselSlide.addEventListener("mousedown", dragStart);
carouselSlide.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carouselSlide.addEventListener("scroll", infiniteScroll);
// ************************************************************************************
