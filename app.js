document.getElementById('photoInput').addEventListener('change', function (event) {
  const photoList = document.getElementById('photoList');
  photoList.innerHTML = '';
  Array.from(event.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      photoList.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}