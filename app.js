
function choosePhotos() {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
  fileInput.onchange = () => {
    const files = Array.from(fileInput.files);
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        gallery.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    document.getElementById("analyzeBtn").disabled = false;
  };
}

function analyzePhotos() {
  const images = Array.from(document.querySelectorAll("#gallery img"));

  if (images.length === 0) {
    alert("No images to analyze.");
    return;
  }

  const scoredImages = images.map((img, index) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = 64;
    const height = 64;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    let sharpness = 0;
    for (let i = 0; i < pixels.length - 4 * width; i += 4) {
      const gray1 = 0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2];
      const gray2 = 0.299 * pixels[i + 4 * width] + 0.587 * pixels[i + 4 * width + 1] + 0.114 * pixels[i + 4 * width + 2];
      sharpness += Math.abs(gray1 - gray2);
    }

    let brightness = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
      brightness += avg;
    }
    brightness = brightness / (pixels.length / 4);

    const score = sharpness * 0.7 + brightness * 0.3;

    return { img, score };
  });

  scoredImages.sort((a, b) => b.score - a.score);

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  scoredImages.forEach(({ img }, idx) => {
    const newImg = img.cloneNode(true);
    newImg.setAttribute("title", `Rank #${idx + 1}`);
    gallery.appendChild(newImg);
  });
}
