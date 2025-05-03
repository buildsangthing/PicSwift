
const gallery = document.getElementById("gallery");
const fileInput = document.getElementById("fileInput");
const analyzeBtn = document.getElementById("analyzeBtn");

function choosePhotos() {
  fileInput.click();
}

fileInput.addEventListener("change", async (e) => {
  const files = Array.from(e.target.files).slice(0, 15);
  gallery.innerHTML = "";
  if (files.length > 0) {
    analyzeBtn.disabled = false;
  }
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector("body").addEventListener("scroll", () => {
  const topBar = document.getElementById("topBar");
  if (window.scrollY > 10) {
    topBar.style.opacity = "0";
  } else {
    topBar.style.opacity = "1";
  }
});
