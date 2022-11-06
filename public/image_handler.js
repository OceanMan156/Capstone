let slideIndex = 1;

displaySlides(slideIndex);

function displaySlides(index){
  let slides = document.getElementsByClassName("slide");
  console.log(slides);  
  // Slide Wrapping
  if (index > slides.length){slideIndex = 1;}
  if (index < 1){slideIndex = slides.length;}

  //slides.forEach((slide) => {
  // slide.style.display = "none";
  //})

  slides[index].style.display = "block";
}

function nextSlide(index){
  console.log("HELLO");
  displaySlides(slideIndex += index);
}
