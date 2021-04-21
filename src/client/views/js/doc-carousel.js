var doc_slideIndex = 1;
doc_showSlides(doc_slideIndex);

function doc_plusSlides(n) {
  doc_showSlides(doc_slideIndex += n);
}

function doc_currentSlide(n) {
  doc_showSlides(doc_slideIndex = n);
}

function doc_showSlides(n) {
  var i;
  var doc_slides = document.getElementsByClassName("docslide");
  var doc_dots = document.getElementsByClassName("doc-dot");
  if (n > doc_slides.length) {doc_slideIndex = 1}    
  if (n < 1) {doc_slideIndex = doc_slides.length}
  for (i = 0; i < doc_slides.length; i++) {
      doc_slides[i].style.display = "none";  
  }
  for (i = 0; i < doc_dots.length; i++) {
      doc_dots[i].className = doc_dots[i].className.replace(" doc-active", "");
  }
  doc_slides[doc_slideIndex-1].style.display = "block";  
  doc_dots[doc_slideIndex-1].className += " doc-active";
}