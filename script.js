var inputElement = document.getElementById("image");

      inputElement.addEventListener("change", handleFiles, false);

      function handleFiles() {
        var fileList = this.files;
        var img = document.createElement("img");
        img.src = URL.createObjectURL(fileList[0]);
        img.onload = function() {
          var canvas = document.createElement("canvas");
          var ratio = img.width / img.height;
          var newHeight = Math.round(300 / ratio);
          canvas.width = 500;
          canvas.height = newHeight;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var asciiArt = convertToAscii(imageData);
          displayAsciiArt(asciiArt);
        };
      }
      function convertToAscii(imageData) {
        var asciiChars = ['@', '%', '#', '*', '+', '=', '-', ':', '.'," "];
        var asciiArt = "";
        for (var i = 0; i < imageData.data.length; i += 4) {
          var r = imageData.data[i];
          var g = imageData.data[i + 1];
          var b = imageData.data[i + 2];
          var brightness = (r + g + b) / 3;
          var index = Math.floor(brightness / 25 );
          var asciiChar = asciiChars[index];
          asciiArt += asciiChar;
          if ((i / 4 + 1) % imageData.width == 0) {
            asciiArt += "\n";
          }
        }
        return asciiArt = asciiArt.replace(/undefined/g, " ");
      }
      function displayAsciiArt(asciiArt) {
        var outputElement = document.getElementById("ascii-art");
        outputElement.innerHTML = asciiArt;
        var fontSize = window.innerWidth / 300;
        outputElement.style.fontSize = fontSize + "px";
      }
      window.addEventListener("resize", function() {
        var asciiArt = document.getElementById("ascii-art").innerHTML;
        displayAsciiArt(asciiArt);
      });