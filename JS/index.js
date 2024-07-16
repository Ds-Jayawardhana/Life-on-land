document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById("videolink");


  var popup = document.getElementById("videopopup");


  var span = document.getElementsByClassName("close")[0];


  btn.onclick = function() {
    popup.style.display = "flex";
  }


  span.onclick = function() {
    popup.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }
  });
