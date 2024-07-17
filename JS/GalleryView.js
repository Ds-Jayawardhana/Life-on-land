var modal = document.getElementById("ModalContainer");

    var images = document.querySelectorAll(".modalImage");
    var modalImg = document.getElementById("imageContainer");
    var caption = document.getElementById("caption");
   

    images.forEach((img) => {
        img.onclick = function(){
            var captionText = img.getAttribute("data-text");
            console.log(captionText)
          modal.style.display = "block";
          modalImg.src = this.src;
          caption.innerHTML = captionText;
        }

        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() { 
          modal.style.display = "none";
        }
    })
    
    